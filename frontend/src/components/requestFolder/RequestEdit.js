import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import SideBar from '../layout/SideBar';
import MapContainer from '../MapContainer';

export class RequestEdit extends Component {
  constructor(props){
    super(props);
    let editItem = this.props.location.state.item;
    console.log('props:', editItem);
    console.log(editItem.Address);
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
    console.log('target',target);
    this.setState({
      [event.target.id]: event.target.value
    });
  }
 
  handleSubmit = async (event) => {
    console.log('submit started');
    event.preventDefault();
    await fetch('https://intern2019dev.clover.studio/requests/edit/<id>',  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, method: 'PUT',
      body: JSON.stringify({
        Title: this.props.location.state.item.Title,
        Request_type: this.props.location.state.item.Request_type,
        Address: this.props.location.state.item.Address,
        location_latitude: this.props.location.state.item.location_latitude, 
        location_longitude: this.props.location.state.item.location_longitude,        
        message: this.props.location.state.item.message,
        photo: this.props.location.state.item.photo,
        crossDomain : true,
        xhrFields: {
          withCredentials: true
  }
      })
    }
    ).then(async (response)  => {
       const json = await response.json();
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
                  ref="title" 
                  defaultValue={this.state.Title}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="type">Tip zahtjeva:</label>
              <div className="input-field">
                <select 
                  ref="Request_type" 
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
                  id="exampleFile"
                  ref="photo" 
                  defaultValue={this.state.photo}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="city">Poruka:</label>
              <div className="input-field" key={this.state.message}>
                <input 
                  type="text"
                  name="message" 
                  ref="message" 
                  defaultValue={this.state.message || ''}
                  onChange={this.handleChange}
                />
              </div>

              <label htmlFor="address">Upišite lokaciju:</label>
              <div className="input-field">
                <input 
                  type="text" 
                  name="address" 
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
