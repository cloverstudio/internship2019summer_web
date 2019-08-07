import React, { Component } from 'react';
import Search from './layout/Search';
import UserList from './UserList';
import axios from 'axios';


export class Users extends Component {

    constructor(){
        super()
        this.state = {
            userprofile: [],
            searchfield: ''
        }
    }


    async componentDidMount(){
        await axios.get('https://jsonplaceholder.typicode.com/users')
        .then ( response => response.data.sort(function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        }))
        .then(users => this.setState({ userprofile: users }))
        }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        }

        

    render() {
        const {userprofile, searchfield} = this.state;
        const filteredUsers = userprofile.filter(user => {
            return  user.name.toLowerCase().includes(searchfield.toLowerCase())
        })


        return (
            <div>
                <Search searchChange = {this.onSearchChange}/>
                <UserList userprofile = {filteredUsers}/>
            </div>
        )
    }
}

export default Users
