import React, { Component } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import moj_grad_logo from '../../assets/moj_grad_logo.svg';
import nav_news_selected_icon from '../../assets/nav_news_selected_icon.svg';
import nav_requests_selected_icon from '../../assets/nav_requests_selected_icon.svg';
import nav_users_selected_icon from '../../assets/nav_users_selected_icon.svg';
import {Image} from 'react-bootstrap';

import { NavItem, NavLink } from 'reactstrap';

export default class SideBarUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RedirectLogin: false,
            profilePhoto: JSON.parse(localStorage.getItem('user')),
            
        };
        
    }


    handleSubmit = async (event) => {
        console.log('Request:');
        await fetch('https://intern2019dev.clover.studio/users/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            }, method: 'POST'
        }
        ).then(async (response) => {
            const json = await response.json();
            console.log('Response:');
            console.log(json);
            localStorage.clear();
            return this.setRedirectLogin();
        }
        ).catch(e => {
            console.log('err', e);
        })
    }


    componentDidMount() {
        if (!localStorage.getItem('user')) {
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


    render() {
        


        return (
            <div className="sidebar-container" style={{ background: '#ffffff' }}>
                <div className="bar-img">
                    <img style={{ maxWidth: '100px' }} alt="logo grada" src={moj_grad_logo} />
                </div>
                <div className="bar-navigation">
                    <div className="bar-links-container">
                        <NavItem style={{ display: 'flex', marginBottom: '20px' }}>
                            <img style={{ maxWidth: '20px' }} alt="newspapers icon" src={nav_news_selected_icon} />
                            <NavLink href="/NewsUser">
                                Vijesti
                      </NavLink>
                        </NavItem>

                        <NavItem style={{ display: 'flex', marginBottom: '20px' }}>
                            <img style={{ maxWidth: '20px' }} alt="request icon" src={nav_requests_selected_icon} />
                            <NavLink href="/NoNewRequests">
                                Zahtjevi
                      </NavLink>
                        </NavItem>



                        <NavItem style={{ display: 'flex' }}>
                            <Image style={{ maxWidth: '20px' }} alt="profile" src={nav_users_selected_icon} />
                            <NavLink href="/ProfileUser">
                                Profil
                      </NavLink>
                        </NavItem>
                    </div>

                    <div className="bar-logout-container">
                        <NavItem style={{ display: 'flex' }}>
                            <Image style={{ maxWidth: '20px' }} alt="logout" src={nav_users_selected_icon} />
                            <Link
                                to="/"
                                className="linkLogin"
                                onClick={this.handleSubmit}>
                                Odjavi me
                    </Link>

                        </NavItem>
                    </div>
                </div>
            </div>

        )
    }
}



