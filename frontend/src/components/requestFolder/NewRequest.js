import React, { Component } from 'react';
import SideBar from '../layout/SideBar';
import MapContainer from '../MapContainer';
import {  Button, FormGroup, FormControl, FormLabel, Row, Col} from "react-bootstrap";
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
    console.log(this.refs.image.value);
    e.preventDefault();
    const addNewRequest = {
      Title: this.refs.title.value,
      Request_type: this.refs.Request_type.value,
      Address: this.refs.address.value,
      // location_latitude: this.refs.location_latitude.value, 
      // location_longitude: this.refs.location_longitude.value,        
      message: this.refs.message.value,
      image: this.refs.image.value

    }
    console.log(addNewRequest);

    this.NewRequest(addNewRequest);

  }

  render() {

    return (

      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="container-gray">
          <div className="new-request-white-container">

            <div className="form-header">
              <div className="back-btn-container">
                <Button
                  className="btn-back bold-btn"
                  color="primary"
                  size="sm"
                  href="/Requests">
                  Vrati se
                </Button>{' '}
              </div>

              <div className="new-request-title">
                <div className="title-request">
                  <p>
                    Novi Zahtjev
                  </p>
                </div>
                <div>
                  <p>
                    Molimo vas, upišite tražene podatke kako bismo mogli zaprimiti zahtjev.
                  </p>
                </div>
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

                <div className="info-container">
                  <Row>
                      <Col md="6">
                        <FormGroup className="type">
                          <label htmlFor="type">Tip zahtjeva:</label>
                          <div className="input-field">
                            <select className="filter-gray" ref="Request_type">
                              <option value="kvar" name="kvar">Kvar</option>
                              <option value="prijedlog" name="prijedlog">Prijedlog</option>
                            </select>
                          </div>
                        </FormGroup>

                        <FormGroup>
                          <label 
                            htmlFor="image" 
                            action="intern2019.def.clover.studio/requests/new" 
                            method="POST" encType="multipart/form-data"
                          >Datoteka:
                          </label>
                          <div className="input-field">
                            <input 
                              type="file" 
                              name="image" 
                              id="exampleFile" 
                              ref="image" 
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      <Col md="6">
                        <FormGroup bssize="large">
                          <FormLabel>Upišite lokaciju:</FormLabel>
                          <FormControl
                            className="border-none"
                            required
                            autoFocus
                            type="textarea"
                            name="address"
                            ref="address"
                            />
                        </FormGroup>

                        <MapContainer/>
                      </Col>
                  </Row>
                </div>
              <div className="message-container">
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
              </div>

              <div className="two-btns-request">
                <Button
                  className="bold-btn blue-btn"
                  color="primary"
                  type="submit"
                  onClick={this.onSubmit.bind(this)}>
                  Pošalji zahtjev
                </Button>{' '}

                <Button
                  className="outd-btn bold-btn blue-btn"
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

