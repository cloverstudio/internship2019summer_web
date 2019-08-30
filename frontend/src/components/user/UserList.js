import React from 'react'
import SingleUser from './SingleUser';
import {withRouter } from 'react-router-dom';

const UserList = ({ userprofile, letterList }) => {

    return (
        <div>
            {
                letterList.map((i, index) => {
                    const filteredUsers = userprofile.filter(user => {
                        if (typeof user.firstName !== typeof null) {
                          return  user.firstName.substring(0, 1).toUpperCase()==i
                        }
                    });
                    return (
                        <div key={index}>
                            <h1>{i}</h1>
                            {
                                filteredUsers.map((user,index) => {
                                    return (
                                        <SingleUser 
                                            key={index}
                                           user={user}
                                        />
                                    );
                                })
                            }
                        </div>
                         
                    )
                })
            }
            <div>{
                userprofile.map(user => {
                    if (typeof user.firstName === typeof null){
                        return (
                            <SingleUser
                            key={user.id}
                            user={user}
                            />
                        )
                    }
                })
                
            }

            </div>

        </div>
    )
}

export default withRouter(UserList);

