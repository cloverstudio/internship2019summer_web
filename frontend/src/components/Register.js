import React, { Component } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainScreen from './MainScreen';
import { Card, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from "axios";

export default class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        oib: "",
        email: "",
        password: "",
        redirect: false
      };
    }
        //redirect
    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }    

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/MainScreen' />
      }
    }     //redirect


          // API poziv

    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    handleSubmit = async (event) => {
      console.log('x');
      event.preventDefault();
      await axios.post('https://intern2019dev.clover.studio/users/register', {
        method: 'POST',
        body: JSON.stringify({
          oib: this.state.oib,
          email: this.state.email,
          password: this.state.password
        
        }) 
      }
      );
      }
          // API poziv

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to='/MainScreen' />
      }

        return (
          
          <Router>
             <div className="register">
              <div className="white-container">
                <div className="main-info" style={{textAlign: "center"}}>
                  <Header />
                  <div className="main-text" style={{marginTop: "20px"}}>
                    <p style={{margin: "0px", fontSize: "23px"}}>
                      Dobro došli i još se bolje snašli!
                    </p>
                    <p style={{fontWeight: "bold"}}>
                      Prijavite se putem OIB-a 
                    </p>
                  </div>                
                </div>
                <div className="form-info">
                  <form  className="name-form">

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
                    <FormGroup controlId="email" bsSize="small">
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
                    <div className="register-btn">
                      {this.renderRedirect()}
                      <Button 
                        style={{fontWeight: "bold"}}
                        size="sm"
                        // bsClass= "RegisterBtn"
                        variant="primary"
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.handleSubmit}>Registriraj me
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-info" style={{textAlign: "center", marginTop: "20px"}}>
                <Footer />
                <Route path="/MainScren" component={MainScreen}/>
              </div>
            </div> 
           </Router>
        );
      }
    }

