import React, { Component } from "react";
import ProductService from "../services/productService";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.saveStorage = this.saveStorage.bind(this);
        this.newStorage = this.newStorage.bind(this);

        this.state = {
            id: null,
            name: "",
            size: 0,

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSize(e) {
        this.setState({
            size: e.target.value
        });
    }

    saveStorage() {
        var data = {
            name: this.state.name,
            size: this.state.size
        };

        ProductService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                size: response.data.size,

                submitted: true
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    newStorage() {
        this.setState({
            id: null,
            name: "",
            size: 0,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Successfully Submitted</h4>
                        <button className="btn btn-success" onClick={this.newStorage}>
                        Add Another Product
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                title="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="size">Size</label>
                            <input
                                type="number"
                                className="form-control"
                                id="size"
                                required
                                value={this.state.size}
                                onChange={this.onChangeSize}
                                title="size"
                            />
                        </div>

                        <button onClick={this.saveStorage} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}