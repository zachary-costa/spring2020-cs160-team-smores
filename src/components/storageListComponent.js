import React, { Component } from "react";
import StorageService from "../services/storageService";
import { Link } from "react-router-dom";

export default class StorageList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveStorages = this.retrieveStorages.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveStorage = this.setActiveStorage.bind(this);
        this.removeAllStorages = this.removeAllStorages.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            storages: [],
            currentStorage: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveStorages();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveStorages() {
        StorageService.getAll().then(response => {
            this.setState({
                storages: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveStorages();
        this.setState({
            currentStorage: null,
            currentIndex: -1
        });
    }

    setActiveStorage(storage, index) {
        this.setState({
            currentStorage: storage,
            currentIndex: index
        });
    }

    removeAllStorages() {
        StorageService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(e => {
            console.log(e);
        });
    }

    searchTitle() {
        StorageService.findByTitle(this.state.searchTitle).then(response => {
            this.setState({
                storages: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        // TODO: UPDATE URL
        const url = "/storage/";
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={this.state.title}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                            Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Storage List</h4>

                    <ul className="list-group">
                        {this.state.storages &&
                            this.state.storages.map((storage, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === this.state.currentIndex
                                            ? "active"
                                            : "")
                                    }
                                    onClick={() => 
                                        this.setActiveStorage(storage, index)}
                                    key={index}
                                >
                                    {storage.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllStorages}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {this.state.currentStorage ? (
                        <div>
                            <h4>Storage</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {this.state.currentStorage.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {this.state.currentStorage.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {this.state.currentStorage.published
                                ? "Published"
                                : "Pending"}
                            </div>

                            <Link 
                                to={url + this.state.currentStorage.id}
                                className="badge badge-warning"
                            >
                            Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Choose a Storage</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}