import React, { Component } from "react";
import ListService from "../services/listService";
import ProductService from "../services/productService";
import { Link } from "react-router-dom";

export default class GroceryList extends Component {

    constructor(props) {
        super(props);
        this.retrieveLists = this.retrieveLists.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveList = this.setActiveList.bind(this);
        this.removeAllLists = this.removeAllLists.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.state = {
            lists: [],
            currentProducts: [],
            products: [],
            currentList: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveLists();
        this.retrieveProducts();
    }

    retrieveLists() {
        ListService.getAll().then(response => {
            this.setState({
                lists: response.data
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
        this.retrieveLists();
        this.setState({
            currentList: null,
            currentIndex: -1
        });
    }

    setActiveList(list, index) {
        this.setState({
            currentList: list,
            currentIndex: index
        }, () => {
            console.log(this.state.currentList);
        });
    }

    removeAllLists() {
        ListService.deleteAll().then(response => {
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
        const url = "/list/";
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Grocery Lists</h4>

                    <ul className="list-group">
                        {this.state.lists &&
                            this.state.lists.map((list, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === this.state.currentIndex
                                            ? "active"
                                            : "")
                                    }
                                    onClick={() => 
                                        this.setActiveList(list, index)}
                                    key={index}
                                >
                                    {list.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllLists}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {this.state.currentList ? (
                        <div>
                            <h4>List</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {this.state.currentList.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Notes:</strong>
                                </label>{" "}
                                {this.state.currentList.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {this.state.currentList.published
                                ? "Published"
                                : "Pending"}
                            </div>

                            <div>
                                <label>
                                    <strong>Products:</strong>
                                </label>
                                {this.state.currentList.products &&
                                this.state.currentList.products.map((product, id) => {
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
                                to={url + this.state.currentList.id}
                                className="badge badge-warning"
                            >
                            Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Choose a List</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}