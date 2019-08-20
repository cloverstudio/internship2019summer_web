import React, { Component } from 'react';
import SideBar from './layout/SideBar';
import MapContainer from './MapContainer';
import { Form, Button, FormGroup, FormControl, FormLabel, Label, FormText } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      naslov: "",
      poruka: "",
      dropdownOpen: false
    };
  }


  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.id]: target.value
    });
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
                      <Button className="btn-back" color="primary" size="sm" href="/Requests">Vrati se nazad</Button>{' '}
                      <p style={{textAlign: 'center', fontSize: '35px'}}>Novi Zahtjev</p>
                    </div>
                    <p style={{textAlign: 'center'}}>Molimo vas, upišite tražene podatke kako bismo mogli zaprimiti zahtjev.</p>
                  </div>

                  <FormGroup controlId="naslov" bssize="large">
                    <FormLabel>Naslov:</FormLabel>
                    <FormControl
                      className="border-none"
                      required
                      type="text"
                      placeholder="" 
                      value={this.state.naslov}
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <Form.Group>
                    <div className="type-files-location-container row" style= {{display: 'table'}}>
                      
                          <div className="type-files-container column">
                            <Form.Group style={{ marginBottom: '50px'}}>
                              <p>Tip zahtjeva:</p>
                              
                                <select id="selector" name="tip">
                                <option value="kv">Kvar</option>
                                <option value="pr">Prijedlog</option>
                                </select>
                              
                            </Form.Group>

                            <FormGroup>
                              <FormLabel htmlFor="exampleFile" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data"
                              >Datoteka: <br></br></FormLabel>
                              <input type="file" name="photo" id="exampleFile" />
                            </FormGroup>     
                          </div>
                            

                      <div className="location-container column">
                          <p>Lokacija:</p>
                          <div className="map-container" style= {{height: '200px', width: '350px'}}>
                            <MapContainer />
                          </div>

                      </div>
                    
                    </div>
                  </Form.Group>

                  <Form.Group controlId="poruka">
                    <FormLabel>Poruka:</FormLabel>
                    <Form.Control 
                      required
                      placeholder=""
                      type="text" 
                      as="textarea" 
                      rows="2"
                      value={this.state.poruka}
                      onChange={this.handleChange}

                    />
                  </Form.Group>

                  <div className="two-btns-request">
                  <Button color="primary">Pošalji zahtjev</Button>{' '}
                  <Button className="outlined-btn" outline color="primary" href="/Requests">Poništi zahtjev</Button>{' '}
                  </div>
                  
                  

              </Form>
            </div>
          </div>

        </div>
      )
   }
}


