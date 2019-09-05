import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import SideBar from '../layout/SideBar';
import {Redirect} from 'react-router-dom';
import ProfileUser from './ProfileUser';

export default class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             renderChangePassword: false,
             userRole: JSON.parse(localStorage.getItem('user'))
        }
        this.showChangePassword = this.showChangePassword.bind(this)
    }
    

    componentWillMount(){
        if(!localStorage.getItem('token')){
           return <Redirect to ='/'/>
        }
    }

    showChangePassword(){
        this.setState({
            renderChangePassword: true
        })
        console.log('heey')
        console.log(this.state.renderChangePassword)
    }

    ChangePasswordComponent(){
        if(this.state.renderChangePassword === true){
            return <ChangePassword/>
        }
    }

    
    
    render() {
        if(this.state.userRole.personsRoleId === 2){
            console.log(this.state.userRole.personsRoleId)
            return <ProfileUser/>
          }
        return (
            <div style ={{display:'flex', background:'#e7e7e7'}}>
                <SideBar/>
                <div className='profile-container'>
                    <ProfileInfo
                    ChangePassword = {this.showChangePassword}/>
                </div>
                
                    {this.ChangePasswordComponent()}
                
            </div>
        )
    }
}
