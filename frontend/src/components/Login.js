import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.scss';
import Footer from './layout/Footer';
import Header from './layout/Header';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
/* get implementacija, validacija uvjeti (duljina usernamea, passworda, provjera emaila kako napravit) */


export default class Login extends Component {
    constructor(props){
        super(props);
            this.state = {
            email: "",
            password: "",
            submitted: false,
            loading: true,
            error: ''
        };
    }

    async componentDidMount(){
      this.getUser();
    }

    async getUser(){
      await axios.get('https://api.randomuser.me/')
      .then(response => 
        response.data.results.map(user => ({
          name: console.log(user.name.first),
          email: console.log(user.email),
          password: console.log(user.login.password)
        }))
        )
        
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }


    //Update the state when the user types something into fields
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

    render() {
        return (

          <Router>
            
            <div className="wrapper">
                
                <div className="Login">
                    <Header/>
                    <p>Dobro došli nazad!</p>
                    <p>Molimo vas, upišite tražene podatke kako bi pristupili usluzi koju nudimo.</p>
                    
                    <form onSubmit={this.handleSubmit}>

                        <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                        autoFocus
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                        </FormGroup>
                    
                        <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
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
                        type="submit"
                        >
                        Prijavi me
                        <Redirect to ="/MainScreen"/>            
                        </Button>

                        <Link to = "/Register" className="link">Registriraj se putem OIB-a</Link>
                        

                    </form>
                    
                </div>
                
              <Footer/>
            

              </div>

            </Router>
        )
    }
}

