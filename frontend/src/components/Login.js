import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './Login.scss';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { Link } from 'react-router-dom';
/* get implementacija, validacija uvjeti (duljina usernamea, passworda, provjera emaila kako napravit) */


export class Login extends Component {
    constructor(props){
        super(props);
            this.state = {
            email: "",
            password: ""
        };
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
      }

    render() {
        return (
            
            <React.Fragment>
                
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
                        Login                
                        </Button>

                    </form>
                    <Footer/>
                </div>
                
                
            </React.Fragment>
        )
    }
}

export default Login