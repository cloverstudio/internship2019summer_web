import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './App.css';
import Register from './components/Register';
//import './styles/_bootstrap.scss';


class App extends Component {
  render() {
    return (
      <div>
        <Register />
      </div>
    )
    
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));