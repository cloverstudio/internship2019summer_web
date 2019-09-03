import React, { Component } from 'react';
import Search from '../layout/Search';
import UserList from './UserList';
import { Button } from "react-bootstrap";
import {Redirect} from 'react-router-dom';
import {Row, Container, Col} from 'react-bootstrap';
import add_icon from '../../assets/add_icon.svg';
import axios from 'axios';
import SideBar from '../layout/SideBar';
import swal from 'sweetalert';
//import apis from '../lib/api/api';


export class Users extends Component {

    constructor(){
        super()
        this.state = {
            userprofile: [],
            searchfield: '',
            redirectAddUser: false,
            jwt: localStorage.getItem('token'),
            letterList: [],
            user: JSON.parse(localStorage.getItem('user'))
        }
    }



    componentWillMount(){
        if(!localStorage.getItem('token')){
           return <Redirect to ="/"/>
        }
    }


    componentDidCatch(json){
        if(json.data.error.error_code == 1006){
            return <Redirect to ='/'/>
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
            console.log(json.data.error)
            /*if(json.data.error.error_code === '1006'){
                //ne radi redirect iz nekog razloga
                return <Redirect to ='/'/>
              }*/
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
                     letters.push(user.firstName.substring(0, 1).toUpperCase());}
            const uniqueLetters = [...new Set(letters)];
            this.setState({letterList: uniqueLetters})
        })
        
        this.setState({userprofile: mapUsers})
        }
        ).catch(error => {
            console.log(error)
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
        const filteredUsers = userprofile.filter(user => {
            let pattern = "^"+ searchfield;
            const regex = new RegExp(pattern, "i")
            return regex.test(user.firstName);
        })


        return (
            <div style={{display:'flex', background:'#e7e7e7'}}>
                <SideBar/>
                <Container style={{margin:"0", background:'#e7e7e7'}}>
                    <Row style={{display:'flex'}}>
                    <Search searchChange = {this.onSearchChange} />
                    <Button className="btn-new-user col"
                    onClick = {this.setRedirectAddNewUser}>
                        <svg>
                            <use>{add_icon}</use>
                        </svg>
                        Kreiraj Korisnika
                    </Button>
                    </Row>
                    <UserList
                userprofile = {filteredUsers}
                letterList ={this.state.letterList}
                />
                </Container>
                
            </div>
        )
    }
}


export default Users
