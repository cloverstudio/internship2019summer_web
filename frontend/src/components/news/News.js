import React, { Component } from 'react';
import SideBar from '../layout/SideBar';
import { Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import NewsList from './NewsList';

export default class News extends Component {

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
            const mapNews = json.data.news.map(news => {
                return news;
            })
            this.setState({newsList: mapNews})
        }).catch(e => {
            return <Redirect to='/NoNews' />
        })
    }


    render() {

        

        return (
            <div className="main-container" style={{ display: 'flex' }} >
                <SideBar />
                <div className="news-container" style={{ background: '#e7e7e7', maxWidth:'90%' }}>
                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginLeft: '20px', color: '#0076ff', background:'white' }}>
                            Sve
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className='no-dropdown'>
                    <NewsList
                    newsList = {this.state.newsList} />
                    </div>
                </div>
            </div>
        )
    }
}


