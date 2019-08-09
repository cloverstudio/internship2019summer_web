import React, { Component } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Card, Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import icon_hidden from '../assets/log_in_lozinka_hiden_icon.svg';
import icon_show from '../assets/log_in_lozinka_icon.svg';
import axios from "axios";


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oib: "",
      email: "",
      password: "",
      redirectToMiddle: false,
      passwordShow: false,
      rememberMe: false,
      token: "",
      // user: {
      //   id: 2323,
      //   name: 'djuro'
      // },
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
    console.log(target);
    this.setState({
      [target.id]: target.type === "checkbox" ? target.checked : target.value
    });
  }

         // password visibility
  togglePasswordVisibility = () => {
    const { passwordShow } = this.state;
    this.setState({ passwordShow: !passwordShow });
  }

        //redirect


    
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

  setRedirectToMiddle = () => {
    this.setState({
      redirectToMiddle: true
    })
  }

  renderRedirectToMiddle = () => {
    if (this.state.redirectToMiddle) {
      return <Redirect to='/MiddleScreen' />
    }
  }  

        // API poziv


    // .catch(e=> {
    //   console.log('err',e);
    // });
 


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }


  render() {
    if (this.state.redirectToMiddle) {
      return <Redirect to='/MiddleScreen' />
    }

    const { passwordShow } = this.state;

    return (

        <div className="gray-container">
          <div className="white-container">
            <div className="main-info" style={{ textAlign: 'center' }}>
              <Header />
              <div className="main-text" style={{ marginTop: '20px' }}>
                <p style={{ margin: '0px', fontSize: '23px' }}>
                  Dobro došli i još se bolje snašli!
                    </p>
                <p style={{ fontWeight: 'bold' }}>
                  Prijavite se putem OIB-a
                    </p>

              </div>
            </div>
            <div className="form-info">
              <form  className="name-form">

                <FormGroup controlId="oib" bssize="large">
                  <FormLabel>OIB:</FormLabel>
                  <FormControl
                    required
                    autoFocus
                    maxLength="11"
                    type="text"
                    value={this.state.oib}
                    onChange={this.handleChange}
                    onChange={this.handleSubmit}
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
                      style={{ paddingRight: '30px' }}
                      placeholder=""
                      required
                      value={this.state.password}
                      onChange={this.handleChange}
                      type={passwordShow ? "text" : "password"}
                    />
                    <img className="password-icon" onClick={this.togglePasswordVisibility} src={icon_show} />
                  </div>
                </FormGroup>

                <FormGroup style={{textAlign: 'center', fontSize: '18px'}}>
                  <input
                    className="remember-me"
                    style={{textAlign: 'center'}}
                    id='rememberMe'
                    type="checkbox"
                    checked={this.state.rememberMe}
                    onChange={this.handleChange} />
                    &nbsp;Zapamti me
                </FormGroup>

                <div className="register-btn">
                  {this.renderRedirectToMiddle()}
                  <Button
                    style={{ fontWeight: 'bold' }}
                    size="sm"
                    // bsClass= "RegisterBtn"
                    variant="primary"
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    onClick= {this.handleSubmit}
                  >Registriraj me
                      </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="footer-info" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Footer />
          </div>
        </div>
    );
  }
}

