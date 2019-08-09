import React, { Component } from 'react';
import Search from './layout/Search';
import UserList from './UserList';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import NewUserUI from './layout/NewUserUI';
import {Redirect} from 'react-router-dom';
import AddNewUser from './AddNewUser';
import axios from 'axios';


export class Users extends Component {

    constructor(){
        super()
        this.state = {
            userprofile: [],
            searchfield: '',
            redirectAddUser: false
        }
    }

    setRedirectAddNewUser = () => {
        this.setState({
          redirectAddUser: true,
        })
      }  

    renderRedirect = () => {
        if (this.state.redirectAddUser) {
          return <Redirect to='/AddNewUser' />
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
        if (this.state.redirectAddUser) {
            return <Redirect to='/AddNewUser' />
          }

        const {userprofile, searchfield} = this.state;
        console.log(userprofile);
        console.log(searchfield);
        const filteredUsers = userprofile.filter(user => {
            let pattern = "^"+ searchfield;
            const regex = new RegExp(pattern, "i")
            console.log(user);
            return regex.test(user.name);
        })


        return (
            <div>
                <Search searchChange = {this.onSearchChange}/>
                <Button onClick = {this.setRedirectAddNewUser}>
                    <NewUserUI />
                </Button>
                <UserList userprofile = {filteredUsers}/>
            </div>
        )
    }
}

export default Users
