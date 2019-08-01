import React, {Component} from 'react';
import Routes from './components/Routes';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainScreen from './components/MainScreen';
//import './styles/_bootstrap.scss';


class App extends Component {
  render() {
    return (
      <Routes />
    );
    
  }
}

export default App;
