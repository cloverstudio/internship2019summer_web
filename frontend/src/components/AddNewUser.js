import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel, Row, Image } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import md5 from 'md5';
import upload_photo_icon from '../assets/upload_photo_icon.svg'


export class AddNewUser extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            name: "",
            email: "",
            password: "",
            oib: "",
            firstName: '',
            lastName: '',
            jwt: localStorage.getItem('token'),
            error: "",
            redirectToUsers: false,
            image: []
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

    handleSubmit = async (event) => {
        event.preventDefault();
        this.separateName(this.state.name);
        await fetch('https://intern2019dev.clover.studio/users/newUser', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': this.state.jwt
          },
          method: 'POST',
          body: JSON.stringify({
            email: this.state.email,
            password: md5(this.state.password),
            oib: this.state.oib,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            crossDomain : true,
            xhrFields: {
              withCredentials: true
            }
          })
          }).then(async (response) =>{
            const json = await response.json();
            console.log(json);
            swal("Uspješno!", "Korisnik će na svoju email adresu dobiti podatke koji su potrebni za prjavu na sustav Moj Grad", "success");
            return this.setRedirectUsers();
            } 
            ).catch(e=>{
              console.log(e);
              swal("Greška!", "Korisnik nije kreiran", "error");
            })
          }

          separateName = name =>{
              const splitString = name.split(' ');
              console.log(splitString);
              this.state.firstName = splitString[0].trim();
              this.state.lastName = splitString[1];
          }

          handleClick(e) {
            this.refs.fileUploader.click();
        }


          uploadPhoto = (event) => {
            fetch('https://intern2019dev.clover.studio/users/newUser',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                  'token': this.state.jwt
                }
            }).then(
              response => response.JSON()
            )
          }

    render() {
      if (this.state.redirectToUsers) {
        return <Redirect to='/Users' />
      }
   
        return (
            <div className="new-user-form">
                <Row>
                  <Button 
                  className = "return"
                  onClick= {this.setRedirectUsers}>
                  Vrati se
                  </Button>
                <h3 className="heading-new-user">Kreiraj korisnika</h3>
                </Row>

                <form>
                <div className="new-user-form-container">
                
                <div className="add-user-photo" onClick={this.handleChange}>
                  <FormGroup controlId="profilePhoto" bsSize="large">
                    <FormLabel bsClass="custom-label">Profilna slika</FormLabel>
                    <div style={{display:'flex', alignContent:'center'}}>
                    <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
                    <Image src={upload_photo_icon} onClick = {this.uploadPhoto} />
                    </div>
                  </FormGroup>
                </div>

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
                onClick = {this.handleSubmit}
                >
                Kreiraj korisnika
                </Button>
                </div>
                

                </form>



            </div>
        )
    }
}

export default AddNewUser
