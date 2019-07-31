import React, { Component } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainScreen from './MainScreen';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/Register.scss";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        oib: "",
        email: "",
        password: ""
      };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
      handleSubmit = event => {
        event.preventDefault();
      }


    render() {
        return (
          <Router>
             <div className="Register" style={{textAlign: "center"}}>
              <Header />
              <p>Dobro dosli i jos bolje se snasli!</p>
              <h5>Prijavite se putem OIB-a</h5>
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="oib" bsSize="large">
                  <FormLabel>OIB:</FormLabel>
                  <FormControl
                    required
                    autoFocus
                    maxLength = "11"
                    type="text"
                    value={this.state.oib}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                  <FormLabel>Email:</FormLabel>
                  <FormControl
                    required
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <FormLabel>Lozinka:</FormLabel>
                  <FormControl
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit">
                  Registriraj me
                </Button>
              </form>
              <Footer />
              <Switch>
                <Route path="/Register" component={Register} exact/> 
                <Route path="/MainScren" component={MainScreen}/> 
              </Switch>
            </div> 
           </Router>
        );
      }
    }

