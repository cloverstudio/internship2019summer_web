import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button, Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import no_content_icon from '../../assets/no_content_icon.svg';
import consts from '../../lib/const';
import nav_users_icon from '../../assets/nav_users_icon.svg'

export default class ProfileInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profileData: JSON.parse(localStorage.getItem('user')),
            images: null,
            linkToPhoto: 'https://intern2019dev.clover.studio/uploads/photos/',
            changedFields: {},
        }
    }


    componentDidMount() {
        if (!localStorage.getItem('token')) {
            return <Redirect to='/' />
        }
    }

    handleChange = (event) => {

        this.setState({
            [event.target.id]: event.target.value,
            changedFields: {
                ...this.state.changedFields,
                [event.target.id]: event.target.value
            }
        });
    }

    joinName(){
        const name = this.state.profileData.firstName.concat(" ")
        name = name.concat(this.state.profileData.lastName)
        this.setState({
            name: name
        })
    }

    uploadImages = (event) => {
        this.setState({
            images: event.target.files[0]
        })
    }

    separateName = name => {
        const splitString = name.split(' ');
        console.log(splitString);
        this.state.changedFields.firstName = splitString[0].trim();
        this.state.changedFields.lastName = splitString[1].trim();
      }

      checkIfError = (json) => {
        if (json.data.error.error_code == consts.errorEmail) {
          return swal('Oib se vec koristi');
        } else if (json.data.error.error_code == consts.errorPassword) {
          return swal('email se vec koristi');
        }
      }


    handleSubmit = async (event) => {
        const data = new FormData()
        for ( var key in this.state.changedFields ) {
            data.append(key, this.state.changedFields[key]);  
            }
        if(this.state.images !== this.state.profileData.image && this.state.images !== null ){
            data.append('photo', this.state.images)
        }
        event.preventDefault();
        await fetch('https://intern2019dev.clover.studio/users/myProfile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
            body: data 
                .then(async (res) => {
                    const json = await res.json();
                    console.log(json);
                    swal("Uspješno!", "Korisnički podatci promijenjeni", "success");
                })
        }
        ).catch(e => {
            console.log(e);
            swal("Greška!", "Podatci nisu promijenjeni!", "error");
        })
    }


    render() {
        if (this.state.profileData.image === null) {
            this.setState({
                profileData: {
                    image: nav_users_icon
                }
            })
        }


        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', padding: '20px' }}>
                <form style={{ alignSelf: 'center' }}>
                    <FormGroup controlId='photo' style={{ display: 'flex', justifyContent: 'center' }}>
                        <input
                            type='file'
                            onChange={this.uploadImages}
                            style={{ display: 'none' }}
                            ref={fileInput => this.fileInput = fileInput} />
                        <Image
                            src={this.state.profileData.image}
                            roundedCircle
                            style={{ alignSelf: 'center', width: '40%' }}
                            onClick={() => this.fileInput.click()}
                            fluid
                        />
                    </FormGroup>

                    <FormGroup controlId='name'>
                        <FormControl
                            className='border-none'
                            value={this.state.name}
                            required
                            onChange={this.handleChange}
                            style={{ alignSelf: 'center' }}
                        />
                    </FormGroup>

                    <FormGroup controlId='oib'>
                        <FormControl
                            onChange={this.handleChange}
                            className='border-none'
                            required
                            value={this.state.profileData.oib}

                        />
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormControl
                            onChange={this.handleChange}
                            className='border-none'
                            required
                            value={this.state.profileData.email}
                        />
                    </FormGroup>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            className='btn-cancel'
                            onClick={this.props.ChangePassword}>
                            Zaboravio/la sam lozinku!
                    </Button>
                    </div>

                    <p style={{ textAlign: 'center', padding: '20px' }}>U slučaju da zaboravite lozinku, ovdje je možete resetirati.</p>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            className='btn-change'
                            onClick={this.handleSubmit}>
                            Promijeni podatke
                    </Button>
                    </div>

                </form>
            </div>
        )
    }
}
