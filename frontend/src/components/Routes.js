
import React, {Component} from 'react';
import Register from './Register';
import MainScreen from './MainScreen';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/MainScreen" component={MainScreen} />
        </Switch>
      </Router>
    );
    
  }
}

export default Routes;

     