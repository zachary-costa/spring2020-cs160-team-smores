import React, { Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddStorage from "./components/addStorageComponent";
import Storage from "./components/storageComponent";
import StorageList from "./components/storageListComponent";

import AddProduct from "./components/addProductComponent";
import Product from "./components/productComponent";
import ProductList from "./components/productListComponent";
import login from "./components/login";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/login" className="navbar-brand">
              FoodButler
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/product"} className="nav-link">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/product/add"} className="nav-link">
                  Add a new Product
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/storage"} className="nav-link">
                  Storages
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/storage/add"} className="nav-link">
                  Add a new Storage
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/login" component={login} />
              <Route exact path={["/", "/storage"]} component={StorageList}/>
              <Route exact path="/storage/add" component={AddStorage} />
              <Route path="/storage/:id" component={Storage} />

              <Route exact path="/product" component={ProductList}/>
              <Route exact path="/product/add" component={AddProduct} />
              <Route path="/product/:id" component={Product} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
