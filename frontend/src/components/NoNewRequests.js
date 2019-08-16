import React, { Component } from 'react';
import SideBar from './SideBar';
import no_content_icon from '../assets/no_content_icon.svg'; 
import {  Button} from "react-bootstrap";
import {BrowserRouter as Redirect} from 'react-router-dom';



export default class NoNewRequests extends Component {
  constructor(props){
    super(props);
      this.state = {
          RedirectRequests: false,

        };
      }


  setRedirectLogin = () => {
    this.setState({
      RedirectRequests: true,
    })
  }  

  renderRedirect = () => {
    if (this.state.RedirectRequests) {
      return <Redirect to='/Requests'/> 
       
    }
  }

    render (){
        
        return(

        <div className="main-container" style={{display:'flex'}} >
          <SideBar />
          <div className="no-news-container">
            <div className="no-news">
                <img style= {{maxWidth: '300px'}} alt= "logo grada gray" src = {no_content_icon} />
                <p style={{fontSize: '60px', fontWeight: '600'}}> 
                    Niti jedan zahtjev<br></br> 
                    još nije poslan!
                </p>   
            </div>
            <div>
              <Button
              className="new-request"
              style= {{width: '250px', padding: '15px', fontSize: 'x-large', fontWeight: '700' }}
              onClick={this.renderRedirect()}
              href="/Requests"
              >
                Novi Zahtjev
              </Button>
            </div> 
          </div>
        </div>

        )
    }
}

