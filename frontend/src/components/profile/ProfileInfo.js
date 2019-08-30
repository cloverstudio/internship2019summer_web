import React, { Component } from 'react'
import { FormGroup, FormControl, FormLabel, Button, Image } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import no_content_icon from '../../assets/no_content_icon.svg';


export default class ProfileInfo extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
             profileData: JSON.parse(localStorage.getItem('user')),
             images: no_content_icon,
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

    uploadImages = () => {
        this.setState({
            // eslint-disable-next-line no-restricted-globals
            images: URL.createObjectURL(event.target.files[0])
        })
    }

    onError = () => {
        if(this.state.profileData.image === null){
            return no_content_icon
        }
      }

    handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('https://intern2019dev.clover.studio/users/myProfile', {
            method: 'PUT',
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                //firstName: ,
                //lastName:  ,
                //oib: ,
                xhrFields: {
                    withCredentials: true
                }
        }).then(async (res) => {
            const json = await res.json();
            console.log(json);
            swal("Uspješno!", "Vijest uspješno objavljena na portal Moj Grad", "success");
        })
        }
        ).catch(e => {
            console.log(e);
            swal("Greška!", "Vijest nije objavljena!", "error");
        })
    }


    render() {
        return (
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <form style={{alignSelf:'center'}}>
                    <FormGroup controlId='photo'>
                    <input
                                    type='file'
                                    onChange={this.uploadImages}
                                    style={{display:'none'}}
                                    ref= {fileInput => this.fileInput = fileInput} />
                        <Image
                        src = {this.onError()}
                        roundedCircle
                        style={{alignSelf:'center', width:'20%'}}
                         />
                    </FormGroup>

                    <FormGroup controlId='name'>
                        <FormControl
                        value={this.state.profileData.firstName + this.state.profileData.lastName} 
                        required
                        style={{alignSelf:'center'}}
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

                    <Button onClick={this.handleSubmit}>Promijeni podatke</Button>

                </form>
            </div>
        )
    }
}
