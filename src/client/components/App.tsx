import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Hello from './Hello'
import Home from './Home'
import NotFound from './NotFound'

export default class App extends Component {
    public render() {
        return (
            <Router>
                <Switch>
                    <Route exact={true} path='/' component={Home}/>
                    <Route path='/hello' component={Hello}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        );
    }
}
