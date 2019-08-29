import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {CardDeck, Card, Button} from 'react-bootstrap';
import SideBar from './layout/SideBar';
import MapContainer from './MapContainer';

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
      // item: JSON.parse(localStorage.getItem(this.props.item))
    }
  }

  componentWillMount(){
    this.getMeetupDetails();
  }

  getMeetupDetails(){
    // var retrievedObject = localStorage.getItem(this.props.item);

    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

    // console.log('retrievedObject2: ', this.props.location.state.item);

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
                <input type="text" name="title" ref="title" defaultValue={this.state.Title}/>
              </div>

              <label htmlFor="type">Tip zahtjeva:</label>
              <div className="input-field">
                <select ref="Request_type" defaultValue={this.state.Request_type} >
                  <option value="kvar" name="kvar">Kvar</option>
                  <option value="prijedlog" name="prijedlog">Prijedlog</option>
                </select>
              </div>

              <label htmlFor="photo" action="intern2019.def.clover.studio/requests/new" method="POST" encType="multipart/form-data">Datoteka:</label>
              <div className="input-field">
                <input type="file" name="photo" id="exampleFile" ref="photo" defaultValue={this.state.photo}/>
              </div>

              <label htmlFor="city">Poruka:</label>
              <div className="input-field">
                <input type="text" name="message" ref="message" defaultValue={this.state.message}/>
              </div>

              <label htmlFor="address">Upišite lokaciju:</label>
              <div className="input-field">
                <input type="text" name="address" ref="address"  defaultValue={this.state.Address}/>
              </div>

             <MapContainer/>

              <div className="two-btns-request">
                <Button
                  color="primary"
                  type="submit"
                  // onClick={this.onSubmit.bind(this)}
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
