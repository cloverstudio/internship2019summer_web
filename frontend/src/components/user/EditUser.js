import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Row, Image } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import md5 from 'md5';
import upload_photo_icon from '../../assets/upload_photo_icon.svg';
import consts from '../../lib/const';
import Sidebar from '../layout/SideBar';


export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: localStorage.getItem('token'),
      redirectToUsers: false,
      linkToPhoto: 'https://intern2019dev.clover.studio/uploads/files/',
      changedFields: {},
      images: null
    }
  }

  componentDidMount = async (event) => {
    await fetch(`https://intern2019dev.clover.studio/users/details/${this.props.match.params.userId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': this.state.jwt
      },
      method: 'GET'
    }
    ).then(async (response) => {
      const json = await response.json();
      console.log(json);
      this.setState({
        firstName: json.data.user.firstName,
        lastName: json.data.user.lastName,
        oib: json.data.user.oib,
        email: String(json.data.user.email),
        image: json.data.user.image,
      })
      if(this.state.firstName !== null && this.state.lastName !== null){
      const name = this.state.firstName.concat(" ").concat(this.state.lastName)
      this.setState({ name: name })
      }else{
        this.setState({ name: '' })
      }
    }).catch(e => {
      console.log(e);
    })
  }

  setRedirectUsers = () => {
    this.setState({
      redirectToUsers: true,
    })
  }

  validateForm() {
    return this.state.email.length > 0
  }

  handleChange = (event) => {

    this.setState({
      [event.target.id]: event.target.value,
      changedFields: {
        ...this.state.changedFields,
        [event.target.id]: event.target.value,
      }
    });
    console.log(this.state.changedFields)
  }



  handleSubmit = async (event) => {
    event.preventDefault();
    //const changedFields = this.state.changedFields
    const data = new FormData;
    for ( var key in this.state.changedFields ) {
      data.append(key, this.state.changedFields[key]);  
      }
    if(this.state.images !== null || this.state.image){
    data.append('photo',this.state.images)
    }
    for(var pair of data.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
    await fetch(`https://intern2019dev.clover.studio/users/newUser/${this.props.match.params.userId}`, {
      headers: {
        'Accept': 'application/json',
        'token': this.state.jwt
      },
      method: 'PUT',
      body: data

    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      swal("Uspješno", "Korisnički podatci uspješno promijenjeni!", "success");
      return this.setRedirectUsers();
    }).catch(e => {
      console.log(e);
      swal("Greška", "Podatci nisu promijenjeni!", "error");
    })
  }

  uploadImages = (event) => {
    this.setState({
      images: event.target.files[0]
    })
  }

  checkIfError = (json) => {
    if (json.data.error.error_code == consts.errorEmail) {
      return swal('Oib se vec koristi');
    } else if (json.data.error.error_code == consts.errorPassword) {
      return swal('email se vec koristi');
    }
  }

  separateName = name => {
    const splitString = name.split(' ');
    console.log(splitString);
    this.state.changedFields.firstName = splitString[0].trim();
    this.state.changedFields.lastName = splitString[1].trim();
  }

  render() {
    if (this.state.redirectToUsers) {
      return <Redirect to='/Users' />
    }
    if (this.state.image === null) {
      return this.state.image = upload_photo_icon
    }



    return (
      <div className="new-user-form" style={{ display: 'flex', background: '#e7e7e7' }}>
        <Sidebar/>
        <div style={{ background: 'white', margin: '10px', minWidth: '50%' }}>
        <Row style={{ display: 'flex' }}>
          <Button
            style={{width:'100px', marginLeft:'35px'}}
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
              <div className="add-user-photo">
                <div style={{ display: 'flex', justifyContent: 'center', height: '100px' }}>
                  <input
                    type="file"
                    onChange={this.uploadImages}
                    id="file"
                    ref={fileInput => this.fileInput = fileInput}
                    style={{ display: "none" }} />
                  <Image src=
                    {this.state.linkToPhoto+`${this.state.image}`}
                    onClick={() => this.fileInput.click()}
                    style={{ justifySelf: 'center', width:'150px' }}
                    roundedCircle />
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
              type="submit"
              onClick={this.handleSubmit}
              disabled={!this.validateForm}
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


