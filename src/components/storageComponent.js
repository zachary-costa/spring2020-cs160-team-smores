import React, { Component } from "react";
import StorageService from "../services/storageService";
import ProductDropDown from "./productDropDownComponent";

export default class Storage extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getStorage = this.getStorage.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateStorage = this.updateStorage.bind(this);
        this.deleteStorage = this.deleteStorage.bind(this);
        this.state = {
            currentStorage: {
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
        this.getStorage(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentStorage: {
                    ...prevState.currentStorage,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentStorage: {
                ...prevState.currentStorage,
                description: description
            }
        }));
    }

    getStorage(id) {
        StorageService.get(id).then(response => {
            this.setState({
                currentStorage: response.data
            });
            console.log(response.data); 
        }).catch(e => {
            console.log(e);
        });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentStorage.id,
            title: this.state.currentStorage.title,
            description: this.state.currentStorage.description,
            products: this.state.currentStorage.products,
            published: status
        };

        StorageService.update(this.state.currentStorage.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentStorage: {
                        ...prevState.currentStorage,
                        published: status
                    }
                }));
                console.log(response.data);
           }).catch(e => {
                console.log(e);
        });
    }

    updateStorage() {
        StorageService.update(
            this.state.currentStorage.id,
            this.state.currentStorage
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Successfully updated Storage"
            });
        }).catch(e => {
            console.log(e);
        });
    }

    deleteStorage() {
        // TODO: UPDATE URL
        const url = "/storage/";
        StorageService.delete(this.state.currentStorage.id)
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
            {this.state.currentStorage ? (
                <div className="edit-form">
                    <h4>Storage</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={this.state.currentStorage.title}
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
                                value={this.state.currentStorage.description}
                                onChange={this.onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {this.state.currentStorage.published
                            ? "Published"
                            : "Pending"}
                        </div>


                    </form>

                    {this.state.currentStorage.published ? (
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
                        onClick={this.deleteStorage}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateStorage}
                    >
                        Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Click on a Storage</p>
                </div>
            )}
        </div>
        );
    }
}