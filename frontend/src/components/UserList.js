import React, { Component } from 'react'
import SingleUser from './SingleUser';

const UserList = ({userprofile}) =>{
    return(
    <div>{
        userprofile.map((user, i)=>{
            return(
                <SingleUser
                key={i}
                id = {userprofile[i].id}
                name = {userprofile[i].name}
                email = {userprofile[i].email}
                />
            );
        })
    }
    </div>
    )
}

export default UserList;


