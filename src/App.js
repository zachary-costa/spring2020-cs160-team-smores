import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddStorage from "./components/addStorageComponent";
import Storage from "./components/storageComponent";
import StorageList from "./components/storageListComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/storage" className="navbar-brand">
              FoodButler
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/storage"} className="nav-link">
                  Storages
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/storage/add"} className="nav-link">
                  Add a new Storage
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/storage"]} component={StorageList}/>
              <Route exact path="/storage/add" component={AddStorage} />
              <Route path="/storage/:id" component={Storage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
