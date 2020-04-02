import React, { Component } from "react";
import ListService from "../services/listService";
import ProductDropDown from "./productDropDownComponent";

export default class List extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getList = this.getList.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateList = this.updateList.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.state = {
            currentList: {
                id: null,
                title: "",
                description: "",
                products: [],
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getList(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentList: {
                    ...prevState.currentList,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentList: {
                ...prevState.currentList,
                description: description
            }
        }));
    }

    changeProducts = (data) => {
        this.setState(function(prevState) {
            return {
                currentList: {
                    ...prevState.currentList,
                    products: data
                }
        }   
        }, () => {
            console.log(this.state);
        });
    }

    getList(id) {
        ListService.get(id).then(response => {
            this.setState({
                currentList: response.data
            });
            console.log(response.data); 
        }).catch(e => {
            console.log(e);
        });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentList.id,
            title: this.state.currentList.title,
            description: this.state.currentList.description,
            products: this.state.currentList.products,
            published: status
        };

        ListService.update(this.state.currentList.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentList: {
                        ...prevState.currentList,
                        published: status
                    }
                }));
                console.log(response.data);
           }).catch(e => {
                console.log(e);
        });
    }

    updateList() {
        ListService.update(
            this.state.currentList.id,
            this.state.currentList
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Successfully updated List"
            });
        }).catch(e => {
            console.log(e);
        });
    }

    deleteList() {
        // TODO: UPDATE URL
        const url = "/list/";
        ListService.delete(this.state.currentList.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push(url)
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        return (
        <div>
            {this.state.currentList ? (
                <div className="edit-form">
                    <h4>List</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={this.state.currentList.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">
                            Description
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={this.state.currentList.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {this.state.currentList.published
                            ? "Published"
                            : "Pending"}
                        </div>

                    </form>

                    <div className="form-group">
                            <label htmlFor="products">Products</label>
                            <ProductDropDown changeProducts={this.changeProducts}
                            productList={this.state.currentList.products}/>
                    </div>

                    {this.state.currentList.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(false)}
                        >
                            Unpublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr2"
                            onClick={() => this.updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteList}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateList}
                    >
                        Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Click on a List</p>
                </div>
            )}
        </div>
        );
    }
}