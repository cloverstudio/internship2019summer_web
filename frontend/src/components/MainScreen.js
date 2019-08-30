import React, { Component } from 'react';
import SideBar from './layout/SideBar';
import no_content_icon from '../assets/no_content_icon.svg'; 

export default class MainScreen extends Component {
    render (){
        
        return(

        <div className="main-container" style={{display:'flex'}} >
                <SideBar />
            <div className="no-news-container">
                <div className="no-news">
                    <img style= {{maxWidth: '300px'}} alt= "logo grada gray" src = {no_content_icon} />
                    <p style={{fontSize: '60px', fontWeight: '600'}}> 
                        Niti jedna vijest <br></br> 
                        još nije objavljena!
                    </p>   
                </div> 
            </div>
        </div>

        )
    }
}

