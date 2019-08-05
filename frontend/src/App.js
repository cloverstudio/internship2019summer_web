import React, {Component} from 'react';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MainScreen from './components/MainScreen';
import Routes from './Routes';
//import './styles/_bootstrap.scss';

class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default App;
