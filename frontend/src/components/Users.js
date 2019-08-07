import React, { Component } from 'react';
import Search from './layout/Search';
import UserList from './UserList';

export class Users extends Component {
    render() {
        return (
            <div>
                <Search/>
                <UserList/>
            </div>
        )
    }
}

export default Users
