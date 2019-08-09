import React, { Component } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import MainScreen from './MainScreen';
import MiddleScreen from './MiddleScreen';
import icon_hidden from '../assets/log_in_lozinka_hiden_icon.svg';
import icon_show from '../assets/log_in_lozinka_icon.svg';
import { Card, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


export default class RegisterErrorScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        oib: "",
        email: "",
        password: "",
        redirect: false,
        passwordShow: false,
      };
    }

    togglePasswordVisibility = () => {
      const { passwordShow } = this.state;
      this.setState({ passwordShow : !passwordShow });
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
        return <Redirect to='/MiddleScreen' />
      }
      
      const { passwordShow } = this.state;

        return (
          
          <Router>
             <div className="gray-container">
              <div className="white-container">
                <div className="main-info" style={{textAlign: 'center'}}>
                  <Header />
                  <div className="main-text" style={{marginTop: '20px'}}>
                    <p style={{margin: '0px', fontSize: '23px'}}>
                      Dobro došli i još se bolje snašli!
                    </p>
                    <p style={{fontWeight: 'bold'}}>
                      Prijavite se putem OIB-a 
                    </p>
                  </div>                
                </div>
                <div className="form-info">
                  <form onSubmit={this.handleSubmit} className="name-form">

                    <FormGroup controlId="oib" bssize="large">
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

                    <FormGroup controlId="email" bssize="small">
                      <FormLabel>Email:</FormLabel>
                      <FormControl
                        required
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </FormGroup>

                    <FormGroup controlId="password" bssize="large">
                      <FormLabel>Lozinka:</FormLabel>
                      <div className="password-container">
                      <FormControl 
                        style={{paddingRight: '30px'}}
                        placeholder= ""
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                        type={passwordShow ? "text" : "password"} 
                      />
                      <img className="password-icon" onClick={this.togglePasswordVisibility} src = {icon_show} />
                      </div>
                    </FormGroup>

                    <div className="register-btn">
                      {this.renderRedirect()}
                      <Button 
                        style={{fontWeight: 'bold'}}
                        size="sm"
                        // bsClass= "RegisterBtn"
                        variant="primary"
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        onClick={this.setRedirect}>Registriraj me
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-info" style={{textAlign: 'center', marginTop: '20px'}}>
                <Footer />
                <Route path="/MiddleScren" component={MainScreen}/>
              </div>
            </div> 
           </Router>

        );
      }
    }

