import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import MainScreen from './components/MainScreen';
import Users from './components/user/Users';
import Profile from './components/profile/Profile';
import AddNewUser from './components/user/AddNewUser';
import MiddleScreen from './components/MiddleScreen';
import EditUser from './components/user/EditUser';
import News from './components/news/News';
import CreateNews from './components/news/CreateNews';
import NoNews from './components/news/NoNews';
import NewsUser from './components/news/NewsUser';
import OpenNews from './components/news/OpenNews';
import NoNewRequests from './components/requestFolder/NoNewRequests';
import NewRequest from './components/requestFolder/NewRequest';
import Requests from './components/requestFolder/Requests';
import MapContainer from './components/MapContainer';
import Map from './components/Map';
import Home from './components/Home';
import RequestEdit from './components/requestFolder/RequestEdit';
import ProfileUser from './components/profile/Profile';
import NoNewsUser from './components/news/NoNewsUser';



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
                    <Route exact path="/noNewsUser" component={NoNewsUser}/>
                    <Route exact path="/News/:createNews" component={CreateNews}/>
                    <Route exact path="/NewsUser/:openNews" component={OpenNews}/>
                    <Route exact path="/Requests"  component={Requests}/>
                    <Route exact path="/Users"  component={Users}/>
                    <Route exact path="/Profile"  component={Profile}/>
                    <Route exact path="/AddNewUser" component={AddNewUser}/>
                    <Route exact path="/Users/:userId" component={EditUser}/>
                    <Route exact path="/NoNewRequests"  component={NoNewRequests}/>
                    <Route exact path="/NewRequest"  component={NewRequest}/>
                    <Route exact path="/Requests/:ID"  component={RequestEdit}/>
                    <Route exact path="/Requests"  component={Requests}/>
                    <Route exact path="/Users"  component={Users}/>
                    <Route exact path="/Profile"  component={Profile}/>
                    <Route exact path="/ProfileUser"  component={ProfileUser}/>
                    <Route exact path="/AddNewUser" component={AddNewUser}/> 
                    <Route exact path="/MapContainer" component={MapContainer}/> 
                    <Route exact path="/Map" component={Map}/> 
                    <Route exact path="/Home" component={Home}/> 
        


                </Switch>
            </Router>
        )}
}

