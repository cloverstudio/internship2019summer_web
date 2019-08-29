import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button, Image } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class ProfileInfo extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
             profileData: JSON.parse(localStorage.getItem('user'))
        }
    }
    

    componentWillMount(){
        if(!localStorage.getItem('token')){
            return <Redirect to ='/'/>
        }
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }


    render() {
        console.log(this.state.profileData.oib);

        
        

        return (
            <div>
                <form>
                    <FormGroup controlId='photo'>
                        <Image src = {this.state.profileData.Image} roundedCircle />
                    </FormGroup>

                    <FormGroup controlId='name'>
                        <FormControl
                        value={this.state.profileData.firstName}
                        required
                        />
                    </FormGroup>

                    <FormGroup controlId='oib'>
                        <FormControl
                        required
                        value = {this.state.profileData.oib}
                        />
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormControl
                        required
                        value = {this.state.profileData.email}
                        />
                    </FormGroup>

                    <Button>Zaboravio/la sam lozinku!</Button>

                    <p>U slučaju da zaboravite lozinku, ovdje je možete resetirati</p>

                    <Button>Promijeni podatke</Button>

                </form>
            </div>
        )
    }
}
