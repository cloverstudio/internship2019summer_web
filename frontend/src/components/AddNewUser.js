import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';


export class AddNewUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            oib: "",
            error: "",
            redirectToUsers: false
        }
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }

    
    setRedirectUsers = () => {
        this.setState({
          redirectToUsers: true,
        })
      }  

    renderRedirect = () => {
        if (this.state.redirectToUsers) {
          return <Redirect to='/Users' />
        }
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

    render() {
      if (this.state.redirectToUsers) {
        return <Redirect to='/Users' />
      }
   
        return (
            <div className="new-user-form">
                <Button onClick= {this.setRedirectUsers}>Vrati se</Button>
                <h3>Kreiraj novog korisnika</h3>

                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="profilePhoto" bsSize="large">
                <FormLabel>Profilna slika</FormLabel>
                <img src=""/>
                </FormGroup>

                <FormGroup controlId="name" bsSize="large">
                <FormLabel>Ime i prezime</FormLabel>
                <FormControl
                        autoFocus
                        type="text"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                        />
                </FormGroup>

                <FormGroup controlId="oib" bsSize="large">
                <FormLabel>OIB</FormLabel>
                <FormControl
                        autoFocus
                        maxLength = "11"
                        type="text"
                        required
                        value={this.state.oib}
                        onChange={this.handleChange}
                        
                        />
                </FormGroup>

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
                <FormLabel>Password</FormLabel>
                <FormControl
                        autoFocus
                        type="password"
                        required
                        value={this.state.password}
                        onChange={this.handleChange}
                        />
                </FormGroup>

                <Button
                block
                disabled = {!this.validateForm()}
                type = "submit"
                onClick = {() => ToastsStore.success("Uspješno!!")}
                >
                Kreiraj korisnika
                </Button>
                <ToastsContainer store={ToastsStore} />

                </form>



            </div>
        )
    }
}

export default AddNewUser
