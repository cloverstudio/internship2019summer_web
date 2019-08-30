import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import SideBar from '../layout/SideBar';
import MapContainer from '../MapContainer';
import {BrowserRouter as Redirect} from 'react-router-dom';


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
      photo: editItem.photo,
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
        photo: this.state.photo
      })
    }
    ).then(async (response)  => {
       const json = await response.json();
      //  return <Redirect to='/Requests' />
      console.log(json);
    }
    ).catch(e=>{
      console.log('err',e);
    })
    }


  render(){
    return (

      <div style={{display:'flex'}}>
        <SideBar />
        <div className="requests-container-gray">
         <Button
            className=""
            color="primary"
            size="sm"
            href="/Requests">
            Vrati se nazad
         </Button>{' '}

          <h1>Izmjena zahtjeva</h1>
          
          <form>
              <label htmlFor="name">Naslov:</label>
              <div className="input-field">
                <input 
                  type="text" 
                  name="title" 
                  id="Title"
                  ref="title" 
                  defaultValue={this.state.Title}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="type">Tip zahtjeva:</label>
              <div className="input-field">
                <select 
                  ref="Request_type"
                  id="Request_type"
                  defaultValue={this.state.Request_type} 
                  onChange={this.handleChange}
                >
                  <option value="kvar" name="kvar">Kvar</option>
                  <option value="prijedlog" name="prijedlog">Prijedlog</option>
                </select>
              </div>

              <label htmlFor="photo" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data">Datoteka:</label>
              <div className="input-field">
                <input 
                  type="file" 
                  name="photo" 
                  id="photo"
                  ref="photo" 
                  defaultValue={this.state.photo}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="city">Poruka:</label>
              <div className="input-field">
                <input 
                  type="text"
                  name="message"
                  id="message"
                  ref="message" 
                  defaultValue={this.state.message}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="address">Upišite lokaciju:</label>
              <div className="input-field">
                <input 
                  type="text" 
                  name="address"
                  id="Address" 
                  ref="address"  
                  defaultValue={this.state.Address}
                  onChange={this.handleChange}
                />
              </div>

             <MapContainer/>

              <div className="two-btns-request">
                <Button
                  color="primary"
                  type="submit"
                  onClick = {this.handleSubmit}
                  >
                  Spremi promjene
                </Button>{' '}

              </div>
            </form>
        </div>
        
      </div>
      
    )
  }
}


export default RequestEdit;
