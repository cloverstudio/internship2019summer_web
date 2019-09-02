import React, { Component } from 'react';
import SideBar from '../layout/SideBar';
import MapContainer from '../MapContainer';
import {  Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import back_icon from '../../assets/back_icon.svg';


class NewRequest extends Component {

  async NewRequest(addNewRequest) {
    console.log(localStorage.getItem('token'));
    try {
      
      const response = await fetch('https://intern2019dev.clover.studio/requests/new', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        method: 'POST',
        body: JSON.stringify(addNewRequest)
      }).then(res => {
        res.json()
        console.log(res);
      })

      console.log("response register new",response);
      this.props.history.push('/Requests');

    } catch (err) {
      console.log(err)
    }

  }

  onSubmit(e) {
    console.log(this.refs.photo.value);
    e.preventDefault();
    const addNewRequest = {
      Title: this.refs.title.value,
      Request_type: this.refs.Request_type.value,
      Address: this.refs.address.value,
      // location_latitude: this.refs.location_latitude.value, 
      // location_longitude: this.refs.location_longitude.value,        
      message: this.refs.message.value,
      photo: this.refs.photo.value

    }
    console.log(addNewRequest);

    this.NewRequest(addNewRequest);

  }

  render() {

    return (

      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="requests-container-gray">
          <div className="new-request-white-container" style={{ margin: '50px' }}>

            <div className="form-header">
              <div className="new-request-title">
                <div className="back-btn-container">
                <Button
                  className="btn-back bold-btn"
                  color="primary"
                  size="sm"
                  href="/Requests">
                  Vrati se
                    </Button>{' '}
                </div>

                <div className="title-request">
                  <p style={{ textAlign: 'center', fontSize: '25px', fontFamily: 'American Typewriter Bold, serif'}}>
                    Novi Zahtjev
                      </p>
                </div>
              </div>
              <div>
                <p style={{ textAlign: 'center' }}>
                  Molimo vas, upišite tražene podatke kako bismo mogli zaprimiti zahtjev.
                </p>
              </div>
            </div>

            <form>
              <FormGroup bssize="large">
                <FormLabel>Naslov:</FormLabel>
                <FormControl
                  className="border-none"
                  required
                  autoFocus
                  type="text"
                  name="title"
                  ref="title"
                  />
              </FormGroup>

              <FormGroup>
                <label htmlFor="type">Tip zahtjeva:</label>
                <div className="input-field">
                  <select ref="Request_type">
                    <option value="kvar" name="kvar">Kvar</option>
                    <option value="prijedlog" name="prijedlog">Prijedlog</option>
                  </select>
                </div>
              </FormGroup>

              <FormGroup>
                <label htmlFor="photo" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data">Datoteka:</label>
                <div className="input-field">
                  <input type="file" name="photo" id="exampleFile" ref="photo" />
                </div>
              </FormGroup>

              <FormGroup bssize="large">
                <FormLabel>Poruka:</FormLabel>
                <FormControl
                  className="border-none"
                  required
                  autoFocus
                  type="text"
                  name="message"
                  ref="message"
                  />
              </FormGroup>

              <FormGroup bssize="large">
                <FormLabel>Upišite lokaciju:</FormLabel>
                <FormControl
                  className="border-none"
                  required
                  autoFocus
                  type="text"
                  name="address"
                  ref="address"
                  />
              </FormGroup>

              <MapContainer/>

              <div className="two-btns-request">
                <Button
                  className="bold-btn"
                  color="primary"
                  type="submit"
                  onClick={this.onSubmit.bind(this)}>
                  Pošalji zahtjev
                </Button>{' '}

                <Button
                  className="outd-btn bold-btn"
                  color="primary"
                  href="/Requests">
                  Poništi zahtjev
                </Button>{' '}
               </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default NewRequest;

