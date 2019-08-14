import React  from 'react'
import nav_users_icon from '../assets/nav_users_icon.svg';
import { Last } from 'react-bootstrap/PageItem';

const SingleUser = ({firstName, lastName, email, img}) =>{
        return (
            <div className="user">
                <img className="profile-photo" src={nav_users_icon} alt=""/>
                <div className="user-info">
                    <h3>{firstName} {lastName}</h3>
                    <p>{email}</p>
                </div>
            </div>
        );
}


export default SingleUser;