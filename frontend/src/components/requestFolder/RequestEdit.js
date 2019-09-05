import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel, Row, Col} from "react-bootstrap";
import SideBar from '../layout/SideBar';
import MapContainer from '../MapContainer';
import { Redirect } from 'react-router-dom';


export class RequestEdit extends Component {
  constructor(props){
    super(props);
    let editItem = this.props.location.state.item;
    console.log('props:', editItem);
    this.state = {
      Title: editItem.Title,
      Request_type: editItem.Request_type,
      Address: editItem.Address,
      location_latitude: editItem.location_latitude, 
      location_longitude: editItem.location_longitude,        
      message: editItem.message,
      image: editItem.image,
      redirectToRequests: false
    }
  }


  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.id]: target.value
    });
  }
 
  handleSubmit = async (event) => {
    console.log('Submit started');
    event.preventDefault();
    let requestId = this.props.location.state.item.ID;
    await fetch(`https://intern2019dev.clover.studio/requests/edit/${requestId}`,  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }, method: 'PUT',
      body: JSON.stringify({
        Title: this.state.Title,
        Request_type: this.state.Request_type,
        Address: this.state.Address,
        location_latitude: this.state.location_latitude, 
        location_longitude: this.state.location_longitude,        
        message: this.state.message,
        image: this.state.image
      })
    }
    ).then(async (response)  => {
       const json = await response.json();
       if(json.data.error) {
        console.log('error')
      } else {
        this.setRedirectToRequests();
      }
    }
    ).catch(e=>{
      console.log('err',e);
    })
  }

    setRedirectToRequests = () =>{
      console.log("Evo");
      this.setState({
          redirectToRequests: true
      })
    }


  render() {
    if (this.state.redirectToRequests) {
      console.log('Redirect....');
      return <Redirect to='/Requests' />
    }


    return (
      
      <div style={{display:'flex'}}>
        <SideBar />
        <div className="container-gray">
         <div className="new-request-white-container">
          <Button
            className="btn-back bold-btn"
            color="primary"
            size="sm"
            href="/Requests">
            Vrati se
          </Button>{' '}
          <div className="title-request new-request-title">
            <h1>Izmjena zahtjeva</h1>
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
                id="Title"
                defaultValue={this.state.Title}
                onChange={this.handleChange}
                />
            </FormGroup>
              
            <div className="info-container">
              <Row>
                <Col md="6">
                  <FormGroup className="type">
                    <label htmlFor="type">Tip zahtjeva:</label>
                    <div className="input-field">
                      <select 
                        className="filter-gray" 
                        ref="Request_type"
                        id="Request_type"
                        defaultValue={this.state.Request_type} 
                        onChange={this.handleChange}
                      >
                        <option value="kvar" name="kvar">Kvar</option>
                        <option value="prijedlog" name="prijedlog">Prijedlog</option>
                      </select>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="image" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data">Datoteka:</label>
                    <div className="input-field">
                      <input 
                        type="file" 
                        name="image" 
                        id="exampleFile" 
                        ref="image" 
                        id="image" 
                        defaultValue={this.state.image}
                        onChange={this.handleChange}
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
                      id="Address" 
                      defaultValue={this.state.Address}
                      onChange={this.handleChange}
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
                    type="textarea"
                    name="message"
                    ref="message"
                    id="message"
                    defaultValue={this.state.message}
                    onChange={this.handleChange}
                    />
                </FormGroup>
              </div>

              <div className="two-btns-request">
                <Button
                  className="bold-btn blue-btn"
                  color="primary"
                  type="submit"
                  onClick = {this.handleSubmit}
                  >
                  Spremi izmjene
                </Button>{' '}

              </div>
            </form>
          </div>
       </div>
      </div>
      
    )
  }
}


export default RequestEdit;
