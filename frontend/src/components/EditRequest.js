import React, { Component } from 'react';
import SideBar from './layout/SideBar';
import MapContainer from './MapContainer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Form, Button, FormGroup, FormControl, FormLabel, Label, FormText } from "react-bootstrap";



export default class EditRequest extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      title: "",
      message: "",
      Request_type: "",
      location_latitude: "",
      location_longitude: "",
      address: "",
      photo: "",
     
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


  // video https://www.youtube.com/watch?v=yN5qKqLDlpM


  // PROCITAJ ------> https://reactjs.org/docs/forms.html
  // handleSubmit(event) {
  //   alert('Your favorite is: ' + this.state.Request_type);
  //   event.preventDefault();
  // }

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.id]: target.value
    });
  }

  validateForm() {
    return this.state.title.length > 0 && this.state.message.length > 0;
  }


    render() {
      return (
        <div style={{display:'flex'}}>
          <SideBar />

          <div className="requests-container-gray">
            <div className="new-request-white-container" style={{margin:'50px'}}>
              <Form>

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
                      <p style={{textAlign: 'center', fontSize: '25px'}}>
                        Novi Zahtjev
                      </p>
                    </div>
                  </div>
                  <div>
                    <p style={{textAlign: 'center'}}>
                      Molimo vas, upišite tražene podatke kako bismo mogli zaprimiti zahtjev.
                    </p>
                  </div>
                </div>

                <FormGroup controlId="title" name="title" bssize="large">
                  <FormLabel>Naslov:</FormLabel>
                  <FormControl
                    className="border-none"
                    required
                    type="text"
                    placeholder="" 
                    value={this.state.title}
                    onChange={this.handleChange}/>
                </FormGroup>

                <Form.Group style={{marginBottom: '0rem'}}>
                  <div className="type-files-location-container row" style= {{display: 'table'}}>
                    
                    <div className="type-files-container column">
                      <Form.Group controlId="selector" style={{ marginBottom: '50px'}}>
                        <FormLabel>Tip zahtjeva:
            
                            <select 
                              // value={this.state.Request_type} 
                              // name="Request_type"
                              // onChange={this.handleChange}
                              >
                               <option value="kvar">Kvar</option>
                                <option value="prijedlog">Prijedlog</option>
                            </select>
                        </FormLabel> 
                      </Form.Group>

                      <FormGroup>
                        <FormLabel htmlFor="exampleFile" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data"
                        >Datoteka: <br></br></FormLabel>
                        <input type="file" name="photo" id="exampleFile" />
                      </FormGroup>     
                    </div>
                      
                    <div className="location-container column">
                      <FormGroup>
                        <FormLabel>Lokacija:</FormLabel>
                        <div className="map-container" style= {{height: '200px', width: '350px'}}>
                          <MapContainer />
                          {/* name="location_longitude and latitiude" */}
                        </div>
                      </FormGroup>
                      <FormGroup controlId="address">
                        <FormLabel>Upišite lokaciju:</FormLabel>
                          <FormControl
                            name="address"
                            className="border-none"
                            type="text"
                            placeholder="" 
                            value={this.state.address}
                            onChange={this.handleChange}/> 
                      </FormGroup> 
                    </div> 
                  </div>
                </Form.Group>

                <Form.Group controlId="message">
                  <FormLabel>Poruka:</FormLabel>
                  <Form.Control 
                    name="message"
                    required
                    placeholder=""
                    type="text" 
                    as="textarea" 
                    rows="2"
                    value={this.state.message}
                    onChange={this.handleChange}/>
                </Form.Group>

                <div className="btn-edit-request" style={{ textAlign: 'center' }}>
                  <Button 
                    color="primary"
                    type="submit"
                    disabled={!this.validateForm()}
                    onClick= {this.handleSubmit}>
                    Spremi izmjene
                  </Button>{' '}
                </div>   
              </Form>
            </div>
          </div>

        </div>
      )
   }
}


