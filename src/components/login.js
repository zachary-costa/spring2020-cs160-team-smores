import React, { Component } from "react";
import "../login.css";
import Logo from "../FoodButler.svg";
import UserService from "../services/userService.js";

export default class Login extends Component {
  constructor(props) {
    super(props);

  this.state = {
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
      newUser: false,
      users: []
  };
  this.register = this.register.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

register(e)
{
  this.setState({ newUser: true });
  UserService.findByName(this.state.username).then(response => {
      this.setState({
          users: response.data
        });
        console.log(response.data);
    }).catch(e => {
        console.log(e);
    });
if (this.state.users == null)
{
      var data = {
        name: this.state.username,
        password: this.state.password
      };

      UserService.create(data).then(response => {
        this.setState({
          id: response.data.id,
          username: response.data.name,
          password: response.data.password,

          submitted: true
        })
        console.log(response.data);
      }).catch(e => {
        console.log(e);
      });
    }
else {
    this.setState({error: "Username already Exists"})
    this.setState({ loading: true });

  }
}
handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { username, password, returnUrl } = this.state;

  // stop here if form is invalid
  if (!(username && password)) {
      return;
  }

  this.setState({ loading: true });
  UserService.findByName(this.state.username).then(response => {
      this.setState({
          users: response.data
        });
        console.log(response.data);
    }).catch(e => {
        console.log(e);
    });
    if (this.state.newUser == true)
    {
      this.setState({ loading: false });
      this.setState({ newUser: false });

    }

    else if (this.state.users.username == this.state.username && this.state.users.password == this.state.password) {
      this.setState({ loading: false });
    }
    else {
        this.setState({error: "Incorrect Username or Password"})
        this.setState({ loading: false });

      }



}

  render() {
    const { username, password, submitted, loading, error } = this.state;
            return (
                <div className="col-md-6 col-md-offset-3">
                  <img src={Logo} alt="website logo"/>

                    <h2>Login or Create an Account</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>
                              Login
                            </button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                        <div className="form-group">
                            <button onClick={this.register} className="btn btn-primary">
                              Create an Account
                            </button>
                        </div>

                        {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }
                    </form>
                </div>
            );
        }
    }
