import React, { Component } from 'react';
import moj_grad_logo from '../../assets/moj_grad_logo.svg';
import '../../styles/Login.scss';

function Header() {
        return <img src = {moj_grad_logo} style = {{maxWidth: "200px"}}/>;
}   

export default Header;