import React, { Component } from "react";
import ProductService from "../services/productService";

class ProductDropDown extends Component {
    constructor(props) {
        super(props);
        this.onChangeProduct = this.onChangeProduct.bind(this);

        this.state = {
            products: [],
            currentProductID: -1,
            currentIndex: -1,
            searchName: "",
            listID: -1
        };
    }

    componentDidMount() {
        let id = this.props.currentID;
        if(id === -1 && this.props.products[0] 
            && this.props.products[0].id) {
            id = this.props.products[0].id;
        }
        
        this.setState({
            products: this.props.products,
            listID: this.props.listID,
            currentProductID: id
        }, () => {
            let data = {
                listID: this.state.listID, 
                productID: this.state.currentProductID
            };
    
            this.props.changeProduct(data);
        });
    }

    onChangeProduct(e) {
        this.setState({
            currentProductID: e.target.value
        }, () => {
            let data = {
                listID: this.state.listID, 
                productID: parseInt(this.state.currentProductID)
            };
    
            this.props.changeProduct(data);
        });
    }

    render() {
        return (
            <div className="mb-2">
            <select name="product" onChange={this.onChangeProduct}>
                {this.state.products &&
                    this.state.products.map((product, id) => {
                        return <option key={id} value={product.id}>
                            {product.name}
                        </option>;
                    })
                }
            </select>
            </div>
        );
    }
}

export default class ProductDropDownList extends Component {

    
    constructor(props) {
        super(props);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);

        this.state = {
            listProducts: [],
            products: [],
            

            submitted: false
        };
    }

    componentDidMount() {
        this.retrieveProducts();
    }

    retrieveProducts() {
        ProductService.getAll().then(response => {
            let lp = this.props.productid;
            if(!lp) {
                lp = [];
            }

            this.setState({
                products: response.data,
                listProducts: lp
            });
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }


    onChangeProduct = (data) => {
        let newList = [...this.state.listProducts];
        newList[data.listID] = data.productID;

        this.setState({
            listProducts: [...newList]
        }, () => {
            let data = this.state.listProducts;
            this.props.changeProducts(data);
        })
    }

    addProduct() {
        let newList = [...this.state.listProducts];
        this.setState({
            listProducts: [...newList, "-1"]
        })
    }

    removeProduct(e) {
        let newProducts = [...this.state.listProducts];
        let i = newProducts.indexOf(e.target.value);
        //console.log(i);
        newProducts = newProducts.splice(i, 1);

        this.setState({
            listProducts: [...newProducts]
        })
    }

    render() {
        return (
            <div>
                {this.state.listProducts &&
                    this.state.listProducts.map((listProduct, id) => {
                        let listProductId = listProduct.id;
                        if(!listProduct.id){
                            listProductId = -1;
                        }
                        return (<div key={id}>
                                <ProductDropDown products={this.state.products}
                                    changeProduct={this.onChangeProduct}
                                    currentID={listProductId}
                                    listID={id}/>
                                </div>);
                    })
                }
                <button onClick={this.addProduct} className="btn btn-info mr-5">
                    + Add another Product
                </button>
            </div>
        );
    }
}