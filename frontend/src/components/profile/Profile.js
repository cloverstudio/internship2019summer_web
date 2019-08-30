import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import SideBar from '../layout/SideBar';
import {Redirect} from 'react-router-dom';

export default class Profile extends Component {

    componentWillMount(){
        if(!localStorage.getItem('token')){
           return <Redirect to ='/'/>
        }
    }

    
    
    render() {
        return (
            <div style ={{display:'flex', background:'#e7e7e7'}}>
                <SideBar/>
                <div className='profile-container'>
                    <ProfileInfo/>
                </div>
                <ChangePassword/>
            </div>
        )
    }
}
