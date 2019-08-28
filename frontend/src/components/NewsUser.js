import React, { Component } from 'react';
import SideBar from './SideBar';
import { Redirect } from 'react-router-dom';
import no_content_icon from '../assets/no_content_icon.svg';
import NewsListUser from './NewsListUser';
import OpenNews from './OpenNews';




export default class NewsUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jwt: localStorage.getItem('token'),
            newsList: [],
            
        }
    }


    

    componentWillMount() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/" />
        }
    }

    async componentDidMount() {
        await fetch('https://intern2019dev.clover.studio/news/all', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.state.jwt
            }, method: 'GET'
        }).then(async (response) => {
            const json = await response.json();
            console.log(json);
            const mapNews = json.data.news.map(news => {
                return news;
            })
            console.log(mapNews)
            this.setState({newsList: mapNews})
            console.log(this.state.newsList)
        }).catch(e => {
            console.log(e);
        })
    }

    redirectToOpenNews = () =>{
        console.log('click');
        
   }


    render() {

        

        return (
            <div className="main-container" style={{ display: 'flex' }} >
                <SideBar />
                <div className="news-container"
                style={{ background: '#e7e7e7', width:'90%', display:'flex' }}>{
                       
                <NewsListUser
                newsList = {this.state.newsList}
                />

                }
                
                     
                     
                    
                </div>
            </div>
        )
    }
}


