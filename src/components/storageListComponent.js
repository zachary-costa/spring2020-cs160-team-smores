import React, { Component } from "react";
import StorageService from "../services/storageService";
import ProductService from "../services/productService";
import { Link } from "react-router-dom";

export default class StorageList extends Component {

    constructor(props) {
        super(props);
        this.retrieveStorages = this.retrieveStorages.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveStorage = this.setActiveStorage.bind(this);
        this.removeAllStorages = this.removeAllStorages.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.state = {
            storages: [],
            currentProducts: [],
            products: [],
            currentStorage: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveStorages();
        this.retrieveProducts();
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

    retrieveProducts() {
        ProductService.getAll().then(response => {
            this.setState({
                products: response.data
            });
            //console.log(response.data);
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
        }, () => {
            console.log(this.state.currentStorage);
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

    getProducts(productIds) {
        let arr = [];
        productIds.forEach(id => {
            ProductService.get(id).then(response => {
                arr.push(response.data);
                console.log(arr);
            }).catch(e => {
                console.log(e);
            });
        });
        return arr;
    }

    render() {
        // TODO: UPDATE URL
        const url = "/storage/";
        return (
            <div className="list row">
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

                            <div>
                                <label>
                                    <strong>Products:</strong>
                                </label>
                                {this.state.currentStorage.products &&
                                this.state.currentStorage.products.map((product, id) => {
                                    return (
                                    <div key={id}>
                                        <label>
                                            {product.name}
                                        </label>
                                    </div>);
                                })
                            }
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