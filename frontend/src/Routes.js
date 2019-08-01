import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import MainScreen from './components/MainScreen';

export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" component={Login} />
                    <Route path="/MainScreen" exact component={MainScreen}/>
                </Switch>
            </Router>
        )}
}

