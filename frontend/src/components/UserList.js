import React from 'react'
import SingleUser from './SingleUser';

const UserList = ({userprofile, letterList}) =>{
    return(
        <div>
            <div>{
                letterList.map(i=>{
                    return(
                        <h1>{i}</h1>
                    )
                })
            }</div>
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
    </div>
    )
}

export default UserList;


