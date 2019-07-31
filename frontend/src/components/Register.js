import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Register.css";

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
          <div className="Register">
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="oib" bsSize="large">
                <FormLabel>OIB</FormLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.oib}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <FormLabel>Password</FormLabel>
                <FormControl
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
          </div>
        );
      }
    }

