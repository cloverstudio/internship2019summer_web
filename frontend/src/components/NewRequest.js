import React, { Component } from 'react';
import SideBar from './layout/SideBar';
import MapContainer from './MapContainer';
import Map from './Map';
import { Form, Button, FormGroup, FormControl, FormLabel, Label, FormText } from "react-bootstrap";



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
        console.log(res.clone().json());
      })

      console.log("response register new",response);
      this.props.history.push('/NewRequest');

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

    // this.NewRequest(addNewRequest);

  }

  render() {

    return (

      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="requests-container-gray">
          <div className="new-request-white-container" style={{ margin: '50px' }}>

            <div className="form-header">
              <div className="new-request-title">
                <Button
                  className="btn-back"
                  color="primary"
                  size="sm"
                  href="/Requests">
                  Vrati se nazad
                    </Button>{' '}

                <div className="title-request">
                  <p style={{ textAlign: 'center', fontSize: '25px' }}>
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
              <label htmlFor="name">Naslov:</label>
              <div className="input-field">
                <input type="text" name="title" ref="title" />
              </div>

              <label htmlFor="type">Tip zahtjeva:</label>
              <div className="input-field">
                <select ref="Request_type">
                  <option value="kvar" name="kvar">Kvar</option>
                  <option value="prijedlog" name="prijedlog">Prijedlog</option>
                </select>
              </div>

              <label htmlFor="photo" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data">Datoteka:</label>
              <div className="input-field">
                <input type="file" name="photo" id="exampleFile" ref="photo" />
              </div>

              <label htmlFor="address">Upišite lokaciju:</label>
              <div className="input-field">
                <input type="text" name="address" ref="address" />
              </div>

              <label htmlFor="city">Poruka:</label>
              <div className="input-field">
                <input type="text" name="message" ref="message" />
              </div>

              <div className="two-btns-request">
                <Button
                  color="primary"
                  type="submit"
                  onClick={this.onSubmit.bind(this)}>
                  Pošalji zahtjev
                </Button>{' '}

                <Button
                  className="outd-btn"
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

