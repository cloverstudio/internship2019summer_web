import React, { Component } from 'react'
import nav_users_icon from '../assets/nav_users_icon.svg';

const SingleUser = ({name, email, img}) =>{
        return (
            <div className="user">
                <img className="profile-photo" src={nav_users_icon} alt=""/>
                <div className="user-info">
                    <h2>{name}</h2>
                    <p>{email}</p>
                </div>
            </div>
        );
}


export default SingleUser;