import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import SideBarUser from '../layout/SideBarUser';
import {Redirect} from 'react-router-dom';
import Profile from './Profile';


export default class ProfileUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             renderChangePassword: false,
             userRole: JSON.parse(localStorage.getItem('user'))
        }
        this.showChangePassword = this.showChangePassword.bind(this)
    }
    

    componentDidMount(){
        if(!localStorage.getItem('token')){
           return <Redirect to ='/'/>
        }
    }

    showChangePassword(){
        this.setState({
            renderChangePassword: true
        })
    }

    ChangePasswordComponent(){
        if(this.state.renderChangePassword === true){
            return <ChangePassword/>
        }
    }

    
    
    render() {
        if(this.state.userRole.personsRoleId === 1){
            console.log(this.state.userRole.personsRoleId)
            return <Profile/>
          }
        return (
            <div style ={{display:'flex', background:'#e7e7e7'}}>
                <SideBarUser/>
                <div className='profile-container'>
                    <ProfileInfo
                    ChangePassword = {this.showChangePassword}/>
                </div>
                
                    {this.ChangePasswordComponent()}
                
            </div>
        )
    }
}
