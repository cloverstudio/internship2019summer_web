import React, { Component } from 'react';
import moj_grad_logo from '../assets/moj_grad_logo.svg';
import nav_news_selected_icon from '../assets/nav_news_selected_icon.svg';
import nav_requests_selected_icon from '../assets/nav_requests_selected_icon.svg'; 
import nav_users_selected_icon from '../assets/nav_users_selected_icon.svg';

import { Nav, NavItem, NavLink } from 'reactstrap';

export default class SideBar extends Component {
    render (){
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

                    <NavItem style= {{display: 'flex'}}>
                        <img style= {{maxWidth: '20px'}} alt= "profile photo" src = {nav_users_selected_icon}/>
                        <NavLink href="/Profil">
                            Profil
                        </NavLink>
                    </NavItem>
                </div>

                <div className="bar-logout-container">
                    <NavItem style= {{display: 'flex'}}>
                        <img style= {{maxWidth: '20px'}} alt= "profile photo" src = {nav_users_selected_icon} />
                        <NavLink href="/Logout">
                            Odjavi me
                        </NavLink>
                    </NavItem>
                </div>
          </div>
       </div>

        )
    }
}



  