import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import MainScreen from './components/MainScreen';
import MiddleScreen from './components/MiddleScreen';

export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/MainScreen"  component={MainScreen}/>
                    <Route exact path="/MiddleScreen"  component={MiddleScreen}/>
                </Switch>
            </Router>
        )}
}

