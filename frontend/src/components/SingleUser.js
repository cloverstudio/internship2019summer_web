import React, { useState, Component } from 'react'
import { Redirect} from 'react-router-dom';
import nav_users_icon from '../assets/nav_users_icon.svg';
import {Image} from 'react-bootstrap';



export default class SingleUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirectToEdit: false,
            linkToPhoto: 'https://intern2019dev.clover.studio/uploads/photos/'
        }
    }

    setredirectToEdit = () => {
        this.setState({
            redirectToEdit: true
        })
        const editUser = JSON.stringify(this.props.user);
          localStorage.setItem('editUser', editUser);
    }
    


    

    render(){
        if (this.state.redirectToEdit) {
            return <Redirect to={`/Users/${this.props.user.ID}`} />
          }

        
            return (

            <div className="user" onClick = {this.setredirectToEdit} id={this.props.user.ID}>
                <Image className="profile-photo" src={this.state.linkToPhoto + `${this.props.user.image}`} alt="" />
                <div className="user-info">
                    <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
                    <p>{this.props.user.email}</p>
                </div>
            </div>

        );
            }
        }



