import React from 'react'
import SingleUser from './SingleUser';

const UserList = ({userprofile}) =>{
    return(
    <div>{
        userprofile.map((user, i)=>{
            return(
                <SingleUser
                key={i}
                id = {userprofile[i].id}
                firstName = {userprofile[i].firstName}
                lastName = {userprofile[i].lastName}
                email = {userprofile[i].email}
                />
            );
        })
    }
    </div>
    )
}

export default UserList;


