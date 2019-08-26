import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {CardDeck, Card} from 'react-bootstrap';
import SideBar from './layout/SideBar';

export class RequestDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      details: props.item
    }
  }

  render(){
    console.log('details')
    return (
      

      <div style={{display:'flex'}}>
        <SideBar />
        <div className="requests-container-gray">
          <h1>Details</h1>
        </div>
        
      </div>
      
    )
  }
}


export default RequestDetails;
