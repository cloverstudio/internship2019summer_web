import React, { Component } from 'react';
import {Button, Image, Card} from 'react-bootstrap';
import add_icon from '../../assets/add_icon.svg';
import {Redirect} from 'react-router-dom';

export class AddNewsButton extends Component {

    constructor(){
        super();
        this.state = {
            redirectToCreateNews: false
        }
    }

    setRedirectToCreateNews = () =>{
        this.setState({
            redirectToCreateNews: true
        })
    }

    render() {
        if (this.state.redirectToCreateNews) {
            return <Redirect to='/News/createNews' />
          }
        return (
            
            <Card className="" style={{background:"white", height:"400px ", width:"300px", color: '#0076ff', justifyContent:'center', margin:'20px'}} onClick={this.setRedirectToCreateNews}>
                <Image  src={add_icon}  style={{width:"100px", height:"100px", alignSelf:'center' }}/>
                <p style={{textAlign:'center'}}>Kreiraj novu vijest</p>
            </Card>
        )
    }
}

export default AddNewsButton
