import React, { Component } from 'react';
import SideBar from './layout/SideBar';
import { Form, Button, FormGroup, FormControl, FormLabel, Label, FormText } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      naslov: "",
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

                  {/* <Form.Group id="naslov">
                    <p>Naslov:</p>
                    <Form.Control 
                        required
                        type="text" 
                        placeholder="" 
                        value={this.state.naslov}
                    />
                  </Form.Group> */}

                  <FormGroup controlId="naslov" bssize="large">
                    <FormLabel>Naslov:</FormLabel>
                    <FormControl
                      required
                      type="text"
                      placeholder="" 
                      value={this.state.naslov}
                      onChange={this.handleChange}
                    />
                  </FormGroup>

                  <Form.Group>
                    <div className="type-files-location-container row" style= {{display: 'table'}}>
                      
                          <div className="type-container column">
                            <p>Tip:</p>
                            <Dropdown className="dropdown-btn" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle caret>
                                Kvar
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem>Prijedlog</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>

                          <div className="files-container column">
                            <FormGroup>
                              <FormLabel for="exampleFile" action="intern2019.def.clover.studio/requests/new" method="POST" enctype="multipart/form-data"
                              >Datoteka: <br></br></FormLabel>
                              <input type="file" name="photo" id="exampleFile" />
                            </FormGroup>     
                          </div>
                    

                      <div className="location-container column">
                          <p>Lokacija:</p>

                      </div>
                    
                    </div>
                  </Form.Group>

                  <Form.Group>
                    <p>Poruka:</p>
                    <Form.Control type="text" placeholder="" />
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


