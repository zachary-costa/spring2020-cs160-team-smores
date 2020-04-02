import React, { Component } from "react";
import ProductService from "../services/productService";
import { Link } from "react-router-dom";

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveProducts = this.retrieveProducts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProduct = this.setActiveProduct.bind(this);
        this.removeAllProducts = this.removeAllProducts.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveProducts() {
        ProductService.getAll().then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveProducts();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(product, index) {
        this.setState({
            currentProduct: product,
            currentIndex: index
        });
    }

    removeAllProducts() {
        ProductService.deleteAll().then(response => {
            console.log(response.data);
            this.refreshList();
        }).catch(e => {
            console.log(e);
        });
    }

    searchName() {
        ProductService.findByName(this.state.searchName).then(response => {
            this.setState({
                products: response.data
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        // TODO: UPDATE URL
        const url = "/product/";
        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Product List</h4>

                    <ul className="list-group">
                        {this.state.products &&
                            this.state.products.map((product, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === this.state.currentIndex
                                            ? "active"
                                            : "")
                                    }
                                    onClick={() => 
                                        this.setActiveProduct(product, index)}
                                    key={index}
                                >
                                    {product.name}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllProducts}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {this.state.currentProduct ? (
                        <div>
                            <h4>Product</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {this.state.currentProduct.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Size:</strong>
                                </label>{" "}
                                {this.state.currentProduct.size}
                            </div>

                            <Link 
                                to={url + this.state.currentProduct.id}
                                className="badge badge-warning"
                            >
                            Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Choose a Product</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}