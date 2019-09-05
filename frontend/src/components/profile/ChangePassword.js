import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import md5 from 'md5';
import swal from 'sweetalert'

export default class ChangePassword extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             currentPassword: '',
             password: '',
             newPassword2: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    

    
    handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData()
        data.append = ('currentPassword', md5(this.state.currentPassword))
        data.append = ('password', md5(this.state.password))
        data.append = ('newPassword2', md5(this.state.newPassword2))
        for(var pair of data.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
          }
        await fetch('https://intern2019dev.clover.studio/users/myProfile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
            body: data
        }).then(async (res) => {
            const json = await res.json();
            console.log(json);
            swal("Uspješno!", "Korisnički podatci promijenjeni", "success");
        }).catch(e => {
            console.log(e);
            swal("Greška!", "Podatci nisu promijenjeni!", "error");
        })
    }

    render() {
        return (
            <div className="change-password"  >
                <form>
                    <h4 className="heading-password-change">Promjena lozinke</h4>
                    <FormGroup controlId="current-password" bsSize="large">
                            <FormLabel>Lozinka:</FormLabel>
                            <FormControl
                            onChange={this.handleChange}
                            className='border-none'
                            autoFocus
                            type="password"
                            required
                            />
                    </FormGroup>
                    
                    <FormGroup controlId="new-password" bsSize="large">
                        <FormLabel>Nova loznika:</FormLabel>
                        <FormControl
                        onChange={this.handleChange}
                        className='border-none'
                        required
                        type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="repeat-password" bsSize="large">
                        <FormLabel>Ponovite novu lozinku:</FormLabel>
                        <FormControl
                        onChange={this.handleChange}
                        className='border-none'
                        required
                        type="password"
                        />
                    </FormGroup>

                        <Button
                        className="btn-change"
                        onClick={this.handleSubmit}
                        block
                        bsSize="large"
                        type="submit"
                        >
                        Promijeni                             
                        </Button>
                </form>
            </div>
        )
    }
}

