import React, { Component } from "react";
import StorageService from "../services/storageService";

export default class AddStorage extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveStorage = this.saveStorage.bind(this);
        this.newStorage = this.newStorage.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
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

    saveStorage() {
        var data = {
            title: this.state.title,
            description: this.state.description
        };

        StorageService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published,

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
            title: "",
            description: "",
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
                        <button className="btn btn-success" onClick={this.newStorage}>
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
                            <label htmlFor="description">Description</label>
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

                        <button onClick={this.saveStorage} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}