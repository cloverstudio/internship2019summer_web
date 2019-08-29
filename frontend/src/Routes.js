import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import MainScreen from './components/MainScreen';
import Users from './components/Users';
import Profile from './components/Profile';
import AddNewUser from './components/AddNewUser';
import MiddleScreen from './components/MiddleScreen';
import NoNewRequests from './components/requestFolder/NoNewRequests';
import NewRequest from './components/requestFolder/NewRequest';
import Requests from './components/requestFolder/Requests';
import MapContainer from './components/MapContainer';
import Map from './components/Map';
import Home from './components/Home';
import RequestEdit from './components/requestFolder/RequestEdit';



export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Register" component={Register}/>
                    <Route exact path="/MainScreen"  component={MainScreen}/>
                    <Route exact path="/MiddleScreen"  component={MiddleScreen}/>
                    <Route exact path="/NoNewRequests"  component={NoNewRequests}/>
                    <Route exact path="/NewRequest"  component={NewRequest}/>
                    <Route exact path="/Requests/:ID"  component={RequestEdit}/>
                    <Route exact path="/Requests"  component={Requests}/>
                    <Route exact path="/Users"  component={Users}/>
                    <Route exact path="/Profile"  component={Profile}/>
                    <Route exact path="/AddNewUser" component={AddNewUser}/> 
                    <Route exact path="/MapContainer" component={MapContainer}/> 
                    <Route exact path="/Map" component={Map}/> 
                    <Route exact path="/Home" component={Home}/> 
        


                </Switch>
            </Router>
        )}
}

