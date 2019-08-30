import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import Footer from './layout/Footer';
import Header from './layout/Header';
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';
import consts from '../lib/const';


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
            token: "",
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
    console.log(event);
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
      console.log("login",this.state);
    }

   
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

    
      handleSubmit = async (event) => {
        event.preventDefault();
        console.log('x');
        event.preventDefault();
        await fetch('https://intern2019dev.clover.studio/users/login', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }, method: 'POST',
          body: JSON.stringify({
            email: this.state.email,
            password: md5(this.state.password),
            crossDomain : true,
            xhrFields: {
              withCredentials: true
          }
          })
        }).then(async (response) =>{
           const json = await response.json();
           console.log(json);
           console.log(json.data.error)
           if(json.data.error){
             return this.checkIfError(json)
           }else{
             const user = json.data.user;
             const jwt = json.data.user.jwt;
             console.log(jwt);
             localStorage.setItem('user',JSON.stringify(user));
             localStorage.setItem('token',jwt);
             return this.setRedirectMainScreen();
           }
      }
        ).catch(e=>{
          console.log(e)
        })
  }

  checkIfError = (json) =>{
    if(json.data.error.error_code == consts.errorEmail){
      return console.log('Oib se vec koristi');
    }else if(json.data.error.error_code == consts.errorPassword){
      return console.log('email se vec koristi')
    }
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
                        
                        <FormGroup controlId="email" bssize="large">
                        <FormLabel>email</FormLabel>
                        <FormControl
                        className="border-none"
                        autoFocus
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                        />
                        </FormGroup>
                    
                        <FormGroup controlId="password" bssize="large">
                        <FormLabel>Lozinka</FormLabel>
                        <FormControl
                        className="border-none"
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
                        className="btn-login"
                        block
                        bssize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick = {this.handleSubmit}
                        >
                        Prijavi me                             
                        </Button>

                        
                      </div>
                      <Link to = "/Register" className="link" onClick={this.setRedirectRegister}>Registriraj se putem OIB-a</Link>
                    </form>
                    
                </div>

                <footer><Footer/></footer>
                
              
            

              </div>

            </Router>
        )
    }
}
