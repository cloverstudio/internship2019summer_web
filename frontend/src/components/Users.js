import React, { Component } from 'react';
import Search from './layout/Search';
import UserList from './UserList';
import { Button } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import {Row, Container} from 'react-bootstrap';
import add_icon from '../assets/add_icon.svg';
import axios from 'axios';
//import apis from '../lib/api/api';


export class Users extends Component {

    constructor(){
        super()
        this.state = {
            userprofile: [],
            searchfield: '',
            redirectAddUser: false,
            jwt: localStorage.getItem('token'),
            letterList: []
        }
    }



    componentWillMount(){
        if(!localStorage.getItem('token')){
           return <Redirect to ="/"/>
        }
    }

    setRedirectAddNewUser = () => {
        this.setState({
          redirectAddUser: true,
        })
      }  

    renderRedirectAddNewUser = () => {
        if (this.state.redirectAddUser) {
          return <Redirect to='/AddNewUser' />
        }
      }


    async componentDidMount(){
        await fetch('https://intern2019dev.clover.studio/users/allUsers/' ,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.state.jwt
              }, method: 'GET',
            })
        .then (async (response) => { 
            const json = await response.json();
            console.log(json);
            const mapUsers = json.data.user.map(user => {
                return user;
            })
            mapUsers.sort(function(a,b){
            if(!a.firstName && b.firstName) {return 1;}
            if(a.firstName && !b.firstName) {return -1;}
            if(!a.firstName && !b.firstName) {return 1;}
            
            if(a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
            if(a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
            return 0;

        })
            const letters = [];
            mapUsers.forEach(user =>{
                if(typeof user.firstName !==  typeof null){
                     letters.push(user.firstName.substring(0, 1));}
                console.log(letters); 
            const uniqueLetters = [...new Set(letters)];
            console.log(uniqueLetters);
            this.setState({letterList: uniqueLetters})
        })
        
        this.setState({userprofile: mapUsers})
        })
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
        const filteredUsers = userprofile.filter(user => {
            let pattern = "^"+ searchfield;
            const regex = new RegExp(pattern, "i")
            return regex.test(user.firstName);
        })


        return (
            <div>
                <Container style={{margin:"0"}}>
                    <Row>
                    <Search searchChange = {this.onSearchChange}/>
                    <Button className="btn-new-user col"
                    onClick = {this.setRedirectAddNewUser}>
                        <svg>
                            <use>{add_icon}</use>
                        </svg>
                        Kreiraj Korisnika
                    </Button>
                    </Row>
                </Container>
                <UserList
                userprofile = {filteredUsers}
                letterList ={this.state.letterList}
                />
            </div>
        )
    }
}


export default Users
