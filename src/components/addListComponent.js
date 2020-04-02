import React, { Component } from "react";
import ListService from "../services/listService";
import ProductDropDown from "./productDropDownComponent";

export default class AddList extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveList = this.saveList.bind(this);
        this.newList = this.newList.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            products: [],
            published: false,
            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    changeProducts = (data) => {
        this.setState({
            products: data
        }, () => {
            console.log(this.state);
        });
    }

    saveList() {
        var data = {
            title: this.state.title,
            description: this.state.description,
            products: this.state.products
        };
        console.log("Sending data: ", data);
        ListService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                products: response.data.products,
                published: response.data.published,

                submitted: true
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    newList() {
        this.setState({
            id: null,
            title: "",
            description: "",
            products: [],
            published: false,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Successfully Submitted</h4>
                        <button className="btn btn-success" onClick={this.newList}>
                        Add Another
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Notes</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="products">Products</label>
                            <ProductDropDown changeProducts={this.changeProducts}/>
                        </div>

                        <button onClick={this.saveList} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}