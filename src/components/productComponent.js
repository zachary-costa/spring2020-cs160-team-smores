import React, { Component } from "react";
import ProductService from "../services/productService";

export default class Product extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSize = this.onChangeSize.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.state = {
            currentProduct: {
                id: null,
                name: "",
                size: 0
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getProduct(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentProduct: {
                    ...prevState.currentProduct,
                    name: name
                }
            };
        });
    }

    onChangeSize(e) {
        const size = e.target.value;

        this.setState(prevState => ({
            currentProduct: {
                ...prevState.currentProduct,
                size: size
            }
        }));
    }

    getProduct(id) {
        ProductService.get(id).then(response => {
            this.setState({
                currentProduct: response.data
            });
            console.log(response.data); 
        }).catch(e => {
            console.log(e);
        });
    }


    updateProduct() {
        ProductService.update(
            this.state.currentProduct.id,
            this.state.currentProduct
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Successfully updated Product"
            });
        }).catch(e => {
            console.log(e);
        });
    }

    deleteProduct() {
        // TODO: UPDATE URL
        const url = "/product/";
        ProductService.delete(this.state.currentProduct.id)
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
            {this.state.currentProduct ? (
                <div className="edit-form">
                    <h4>Product</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={this.state.currentProduct.name}
                                onChange={this.onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="size">
                            Size
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="size"
                                value={this.state.currentProduct.size}
                                onChange={this.onChangeSize}
                            />
                        </div>
                    </form>

                    <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteProduct}
                    >
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateProduct}
                    >
                        Update
                    </button>
                    <p>{this.state.message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Click on a Product</p>
                </div>
            )}
        </div>
        );
    }
}