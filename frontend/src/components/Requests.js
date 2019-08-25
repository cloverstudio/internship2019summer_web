import React, { Component } from 'react'
import NewRequest from './NewRequest';
import add_icon from '../assets/add_icon.svg';
import SideBar from './layout/SideBar';

export class Requests extends Component {
    render() {
      return (
        <div style={{display:'flex'}}>
           <SideBar />
            <div className="requests-container-gray">
              <div className="new-requests-container">
                <div className="requests-icon"> 
                  <img style= {{maxWidth: "200px"}} src = {add_icon} alt="Add more"/>
                </div>
                <div className="requests-text">
                <p>Novi zahtjev</p>
                </div>
              </div>

              <div className="new-requests-container">
                <div className="requests-icon"> 
                  <img style= {{maxWidth: "200px"}} src = {add_icon} alt="Add more"/>
                </div>
                <div className="requests-text">
                <p>Novi zahtjev</p>
                </div>
              </div>
            </div>
       
            

                 
        </div>
        )
    }
}

export default Requests
