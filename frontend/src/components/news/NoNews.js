import React, { Component } from 'react';
import SideBar from '../layout/SideBar';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import no_content_icon from '../../assets/no_content_icon.svg';

export default class NoNews extends Component {

    constructor(props){
        super(props);
        this.state = {
            redirectToCreateNews: false,
            jwt: localStorage.getItem('token')
        }
    }
    

    setRedirectToCreateNews = () => {
        this.setState ({
            redirectToCreateNews: true
        })
    }

    componentWillMount(){
        if(!localStorage.getItem('token')){
            return <Redirect to ="/"/>
         }
    }


    render() {

        if(this.state.redirectToCreateNews === true){
            return <Redirect to = "/News/:createNews"/>
        }

        return (
            <div className="main-container" style={{display:'flex'}} >
                <SideBar />
            <div className="no-news-container">
                <div className="no-news">
                    <img style= {{maxWidth: '300px'}} alt= "logo grada gray" src = {no_content_icon} />
                    <p style={{fontSize: '60px', fontWeight: '600'}}> 
                        Niti jedna vijest <br></br> 
                        još nije objavljena!
                    </p>
                    <Button onClick = {this.setRedirectToCreateNews}>
                        Objavi vijest
                    </Button>
                    
                       
                </div> 
            </div>
        </div>
        )
    }
}


