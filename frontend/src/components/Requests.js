import React, { Component } from 'react'
import NewRequest from './layout/NewRequest';
import SideBar from './SideBar';

export class Requests extends Component {
    render() {
      return (
        <div style={{display:'flex'}}>
           <SideBar />
            <div className="requests-container-gray">
              <NewRequest/>
              <NewRequest/>

            </div>      
        </div>
        )
    }
}

export default Requests
