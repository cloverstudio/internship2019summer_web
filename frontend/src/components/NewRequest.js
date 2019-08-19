import React, { Component } from 'react'
import SideBar from './layout/SideBar';


export default class NewRequest extends Component {
    render() {
      return (
        <div style={{display:'flex'}}>
          <SideBar />

          <div className="requests-container-gray">
            <div className="new-request-white-container">
              <p>Novi Zahtjev</p>
            </div>
          </div>

        </div>
      )
   }
}


