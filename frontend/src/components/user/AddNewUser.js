import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel, Row, Image } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import md5 from 'md5';
import upload_photo_icon from '../../assets/upload_photo_icon.svg'
import SideBar from '../layout/SideBar';
import consts from '../../lib/const';



export class AddNewUser extends Component {

  constructor(props) {
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
      image: upload_photo_icon,
      images: undefined,
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


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    console.log(this.state.images)
    const data = new FormData()
    data.append('photo', this.state.images);
    event.preventDefault();
    this.separateName(this.state.name);
    data.append('firstName', this.state.firstName)
    data.append('lastName', this.state.lastName)
    data.append('oib', this.state.oib)
    data.append('email', this.state.email)
    data.append('password', md5(this.state.password))
    for(var pair of data.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
    await fetch('https://intern2019dev.clover.studio/users/newUser', {
      headers: {
        'Accept': 'application/json',
        'token': this.state.jwt
      },
      method: 'POST',
      body: data
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      if(json.data.error){
        return this.checkIfError(json)
      }else{
      swal("Uspješno!", "Korisnik će na svoju email adresu dobiti podatke koji su potrebni za prjavu na sustav Moj Grad", "success");
      return this.setRedirectUsers();
    }
    }
    ).catch(e => {
      console.log(e);
      swal("Greška!", "Korisnik nije kreiran", "error");
    })
  }


  checkIfError = (json) =>{
    if(json.data.error.error_code == consts.errorEmail){
      return swal('Oib se vec koristi');
    }else if(json.data.error.error_code == consts.errorPassword){
      return swal('email se vec koristi');
    }
    }

  separateName = name => {
    const splitString = name.split(' ');
    console.log(splitString);
    this.state.firstName = splitString[0].trim();
    this.state.lastName = splitString[1];
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  uploadImages = (event) => {
    //e tu je fora, ne smije se preko URL appendat image u state jer je to onda string
    this.setState({
      images: event.target.files[0]
    })
  }




  render() {
    if (this.state.redirectToUsers) {
      return <Redirect to='/Users' />
    }

    return (
      <div className="new-user-form" style={{ display: 'flex', background: '#e7e7e7' }}>
        <SideBar />
        <div style={{ background: 'white', margin: '10px', minWidth: '50%' }}>
          <Row style={{ display: 'flex' }}>
            <Button
              className="return"
              onClick={this.setRedirectUsers}>
              Vrati se
                  </Button>
            <h3 className="heading-new-user">Kreiraj korisnika</h3>
          </Row>

          <form>
            <div className="new-user-form-container">

              
                <FormGroup controlId="profilePhoto" bsSize="large">
                  <FormLabel bsClass="custom-label">Profilna slika</FormLabel>
                  <div className="add-user-photo" onClick={this.handleChange}>
                  <div style={{ display: 'flex', justifyContent: 'center', height:'100px'}}>
                    <input
                      type="file"
                      onChange={this.uploadImages}
                      id="file"
                      ref={fileInput => this.fileInput = fileInput}
                      style={{ display: "none" }} />
                    <Image src={upload_photo_icon}
                      onClick={() => this.fileInput.click()}
                      style={{ justifySelf: 'center' }}
                      />
                  </div>
                  </div>
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
                  maxLength="11"
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
                disabled={!this.validateForm()}
                type="submit"
                onClick={this.handleSubmit}
              >
                Kreiraj korisnika
                </Button>
            </div>


          </form>

        </div>

      </div>
    )
  }
}

export default AddNewUser
