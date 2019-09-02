import React, { Component } from 'react';
import SideBarUser from '../layout/SideBarUser';
import { Redirect } from 'react-router-dom';
import NewsListUser from './NewsListUser';

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
            return <Redirect to='/NoNewsUser' />
        })
    }

    redirectToOpenNews = () =>{
        console.log('click');
        
   }


    render() {

        

        return (
            <div className="main-container" style={{ display: 'flex' }} >
                <SideBarUser />
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


