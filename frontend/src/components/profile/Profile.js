import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import SideBar from '../layout/SideBar';
import {Redirect} from 'react-router-dom';

export default class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             renderChangePassword: false,
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
