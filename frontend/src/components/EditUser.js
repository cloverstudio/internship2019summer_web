import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel, Row, Image } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import md5 from 'md5';
import upload_photo_icon from '../assets/upload_photo_icon.svg';

export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: localStorage.getItem('token'),
      redirectToUsers: false,
      linkToPhoto: 'https://intern2019dev.clover.studio/uploads/photos/',
      changedFields: {}
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
      const name = this.state.firstName.concat(" ").concat(this.state.lastName)
      this.setState({ name: name })
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

    if (event.target.id == "name"){
      this.separateName(this.state.name);
      console.log(this.state.changedFields);
    }
    this.setState({
      [event.target.id]: event.target.value,
      changedFields: {
        ...this.state.changedFields,
        [event.target.id]: event.target.value
      }
    });
  }



  handleSubmit = async (event) => {
    if(this.state.firstName === this.state.changedFields.firstName ){
      delete this.state.changedFields.firstName
    }
    if(this.state.lastName === this.state.changedFields.lastName){
      delete this.state.changedFields.lastName
    }
    delete this.state.changedFields.name;
    const sendObject = this.state.changedFields
    console.log(sendObject);
    event.preventDefault();
    await fetch('https://intern2019dev.clover.studio/users/newUser', {
      headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
        'token': this.state.jwt
      },
      method: 'PUT',
      body: JSON.stringify(sendObject)
      
    }).then(async (response) => {
      const json = await response.json();
      console.log(json);
      swal("Uspješno", "Korisnički podatci uspješno promijenjeni!", "success");
      return this.setRedirectUsers();
    }).catch(e => {
      console.log(JSON.parse(e));
      swal("Greška", "Podatci nisu promijenjeni!", "error");
    })
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
      <div className="new-user-form ">
        <Row>
          <Button
            className="return"
            onClick={this.setRedirectUsers}>
            Vrati se
            </Button>
          <h3 className="heading-new-user">Kreiraj korisnika</h3>
        </Row>

        <form>
          <div className="new-user-form-container">

            <div className="add-user-photo">
              <FormGroup controlId="profilePhoto" bsSize="large">
                <FormLabel bsClass="custom-label">Profilna slika</FormLabel>
                <Image src={this.state.linkToPhoto + `${this.state.image}`} style={{ display: "flex", maxWidth: "50px", borderRadius: "30px" }} />
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
    )
  }
}


