import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
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
            redirectMainScreen: false,
            redirectRegister: false,
            error: '',
            rememberMe: false,
            token: '',
            user: {
              id: 2323,
               name: 'djuro'
             },
        };
    }

     // Local Storage
  handleFormSubmit = () => {
    const { user, rememberMe, token } = this.state;
    localStorage.setItem('rememberMe', rememberMe);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    console.log('user', JSON.parse(localStorage.getItem("user")))
  };

      // remember me checkbox
  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.id]: target.type === "checkbox" ? target.checked : target.value
    });
  }

         // password visibility
  togglePasswordVisibility = () => {
    const { passwordShow } = this.state;
    this.setState({ passwordShow: !passwordShow });
  }

    setRedirectMainScreen = () => {
      this.setState({
        redirectMainScreen: true,
        
      })
    }
    setRedirectRegister = () => {
      this.setState({
        redirectRegister: true,
      })
    }  


    renderRedirect = () => {
      if (this.state.redirectMainScreen) {
        return <Redirect to='/MainScreen' />
      }
    }

    renderRedirectToRegister = () => {
      if (this.state.redirectRegister) {
        return <Redirect to='/Register' />
      }
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
    const data = new FormData(event.target);
    axios.post('api/form-submit-url', {
      data
    })
    .then(response => {
      console.log('success',data);
      this.handleFormSubmit()
      this.setRedirect();
    })
    .catch(e=> {
      console.log('err',e);
    });
  }

    render() {
      if (this.state.redirectMainScreen) {
        return <Redirect to='/MainScreen' />
      }
      if (this.state.redirectRegister) {
        return <Redirect to='/Register' />
      }

        return (

          <Router>
            
            <div className="wrapper">
                
                <div className="Login">
                    <Header/>
                    <p className="heading">Dobro došli nazad!</p>
                    <p className="msg">Molimo vas, upišite tražene podatke kako bi pristupili usluzi koju nudimo.</p>
                    
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-info">
                        <FormGroup controlId="email" bsSize="large">
                        <FormLabel>email</FormLabel>
                        <FormControl
                        autoFocus
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                        </FormGroup>
                    
                        <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Lozinka</FormLabel>
                        <FormControl
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                        />
                        </FormGroup>

                        <FormGroup>
                          <input
                            id='rememberMe'
                            type="checkbox"
                            checked={this.state.rememberMe}
                            onChange={this.handleChange} />
                            &nbsp;Zapamti me
                        </FormGroup>

                        <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick = {this.setRedirectMainScreen}
                        >
                        Prijavi me                             
                        </Button>

                        
                      </div>
                      <Link to = "/Register" className="link" onClick={this.setRedirectRegister}>Registriraj se putem OIB-a</Link>
                    </form>
                    
                </div>
                
              <Footer/>
            

              </div>

            </Router>
        )
    }
}
