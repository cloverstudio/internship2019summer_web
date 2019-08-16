import React, { Component } from 'react'
import NewRequest from './layout/NewRequest';
import SideBar from './SideBar';

export class Requests extends Component {
    render() {
        return (
            
            <div>
                <SideBar/>
                <NewRequest/>
                
            </div>
        )
    }
}

export default Requests
