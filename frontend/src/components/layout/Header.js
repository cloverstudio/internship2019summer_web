import React, { Component } from 'react';
import moj_grad_logo from '../../assets/moj_grad_logo.svg';

function Header() {
        return <img style= {{maxWidth: '200px', margin:'15px'}} alt= "logo grada" src = {moj_grad_logo} />;
}   

export default Header;