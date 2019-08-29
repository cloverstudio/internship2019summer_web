import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {CardDeck, Card, Button} from 'react-bootstrap';
import SideBar from './layout/SideBar';

export class RequestEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      // Title: this.refs.title.value,
      // Request_type: this.refs.Request_type.value,
      // Address: this.refs.address.value,
      // location_latitude: this.refs.location_latitude.value, 
      // location_longitude: this.refs.location_longitude.value,        
      // message: this.refs.message.value,
      // photo: this.refs.photo.value,
      item: JSON.parse(localStorage.getItem(this.props.item))
    }
  }

  componentWillMount(){
    this.getMeetupDetails();
  }

  getMeetupDetails(){
  //   var retrievedObject = localStorage.getItem(this.props.item);

  // console.log('retrievedObject: ', JSON.parse(retrievedObject));

  // console.log(this.props.item);

  }




  render(){
    let editRequest = JSON.parse(localStorage.getItem('editRequest'));
    console.log(editRequest);
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
