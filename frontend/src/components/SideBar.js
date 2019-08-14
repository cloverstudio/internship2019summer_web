import React, { Component } from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';
import moj_grad_logo from '../assets/moj_grad_logo.svg';
import nav_news_selected_icon from '../assets/nav_news_selected_icon.svg';
import nav_requests_selected_icon from '../assets/nav_requests_selected_icon.svg'; 
import nav_users_selected_icon from '../assets/nav_users_selected_icon.svg';

import { Nav, NavItem, NavLink } from 'reactstrap';

export default class SideBar extends Component {
    constructor(props){
        super(props);
          this.state = {
              RedirectLogin: false,
                // user: {
                //     id: 2323,
                //     name: 'djuro'
                // },
        };
    }

    componentDidMount() {
        if(!localStorage.getItem('user')){
            this.setRedirectLogin();
        } else {
            console.log('Using data from localStorage');
        }
    }

    setRedirectLogin = () => {
        this.setState({
          RedirectLogin: true,
        })
      }  

    renderRedirect = () => {
        if (this.state.RedirectLogin) {
          localStorage.clear();
          return <Redirect to='/'/> 
           
        }
      }
      
    render (){

      // if (this.state.RedirectLogin) {
      //   localStorage.clear();
      //   return <Redirect to='/'/> 
      // }

        return(
          <div className="sidebar-container">
            <div className="bar-img">
                <img style= {{maxWidth: '100px'}} alt= "logo grada" src = {moj_grad_logo} />
            </div>
            <div className="bar-navigation">
               <div className="bar-links-container">
                  <NavItem style= {{display: 'flex', marginBottom: '20px'}}>
                      <img style= {{maxWidth: '20px'}} alt= "newspapers icon" src = {nav_news_selected_icon} />
                      <NavLink href="/MainScreen">
                          Vijesti
                      </NavLink>
                  </NavItem>

                  <NavItem style= {{display: 'flex', marginBottom: '20px'}}>
                      <img style= {{maxWidth: '20px'}} alt= "request icon" src = {nav_requests_selected_icon} />
                      <NavLink href="/Requests">
                          Zahtjevi
                      </NavLink>
                  </NavItem>

                  <NavItem style= {{display: 'flex', marginBottom: '20px'}}>
                      <img style= {{maxWidth: '20px'}} alt= "request icon" src = {nav_requests_selected_icon} />
                      <NavLink href="/Users">
                          Korisnici
                      </NavLink>
                  </NavItem>

                  <NavItem style= {{display: 'flex'}}>
                      <img style= {{maxWidth: '20px'}} alt= "profile photo" src = {nav_users_selected_icon}/>
                      <NavLink href="/Profile">
                          Profil
                      </NavLink>
                  </NavItem>
                </div>

                <div className="bar-logout-container">
                    <NavItem style= {{display: 'flex'}}>
                      <img style= {{maxWidth: '20px'}} alt= "profile photo" src = {nav_users_selected_icon} />
                        <NavLink 
                          onClick={this.renderRedirect()}
                          href="/" >
                             Odjavi me
                        </NavLink>
                    </NavItem>
                </div>
              </div>
          </div>

        )
    }
}



  