import React, { Component } from 'react'
import add_icon from '../../assets/add_icon.svg';

export class NewRequest extends Component {
    render() {
      return (
        <div className="new-requests-container">
          <div className="requests-icon"> 
            <img style= {{maxWidth: "200px"}} src = {add_icon} />
          <div className="requests-text">
            <p>Novi zahtjev</p>
          </div>
          </div>
       </div>
      )
   }
}

export default NewRequest
