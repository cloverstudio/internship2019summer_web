import React, { Component } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainScreen from './MainScreen';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/Register.scss";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from "axios";

export default class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        oib: "",
        email: "",
        password: "",
        //redirect
        redirect: false 
      };
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }    //redirect


    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/MainScreen' />
      }
    }  // treba prepraviti


          // API poziv
    async componentDidMount() {
        this.getUser();
    }

    async getUser(){
      await axios.get("https://api.randomuser.me/")
      .then(response =>
        response.data.results.map(user => ({
          email: console.log(user.email),
          password: console.log (user.login.password)
        }))
      )
    }
    
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
    handleSubmit = event => {
      event.preventDefault();
      const data = new FormData (event.target);
      fetch('api/form-submit-url', {
        method: 'POST',
        body: data
      }
      );
      console.log('success');
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
            <React.Fragment>
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
                <div>
                  {this.renderRedirect()}
                  <button 
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    onClick={this.setRedirect}>Registriraj me
                  </button>
                </div>
              </form>
              <Footer />
              <Route path="/MainScren" component={MainScreen}/>
            </div> 
            </React.Fragment>
           </Router>
        );
      }
    }

