import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import MainScreen from './components/MainScreen';
import Requests from './components/Requests';
import Users from './components/Users';
import Profile from './components/Profile';
import AddNewUser from './components/AddNewUser';
import MiddleScreen from './components/MiddleScreen';
import EditUser from './components/EditUser';
import News from './components/News';
import CreateNews from './components/CreateNews';
import NoNews from './components/NoNews';
import NewsUser from './components/NewsUser';
import OpenNews from './components/OpenNews';


export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Register" component={Register}/>
                    <Route exact path="/MainScreen"  component={MainScreen}/>
                    <Route exact path="/MiddleScreen"  component={MiddleScreen}/>
                    <Route exact path="/News" component={News}/>
                    <Route exact path="/NewsUser" component={NewsUser}/>
                    <Route exact path="/noNews" component={NoNews}/>
                    <Route exact path="/News/:createNews" component={CreateNews}/>
                    <Route exact path="/NewsUser/:openNews" component={OpenNews}/>
                    <Route exact path="/Requests"  component={Requests}/>
                    <Route exact path="/Users"  component={Users}/>
                    <Route exact path="/Profile"  component={Profile}/>
                    <Route exact path="/AddNewUser" component={AddNewUser}/>
                    <Route exact path="/Users/:userId" component={EditUser}/>


                    
                </Switch>
            </Router>
        )}
}

