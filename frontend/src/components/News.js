import React, { Component } from 'react';
import SideBar from './SideBar';
import { Dropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import no_content_icon from '../assets/no_content_icon.svg';
import AddNewsButton from './layout/AddNewsButton';
import NewsContainer from './NewsContainer';
import NewsList from './NewsList';




export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToCreateNews: false,
            jwt: localStorage.getItem('token'),
            newsList: []
        }
    }


    setRedirectToCreateNews = () => {
        this.setState({
            redirectToCreateNews: true
        })
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


    render() {

        if (this.state.redirectToCreateNews === true) {
            return <Redirect to="/News/:createNews" />
        }

        return (
            <div className="main-container" style={{ display: 'flex' }} >
                <SideBar />
                <div className="news-container" style={{ background: '#e7e7e7' }}>
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
                    <AddNewsButton />
                    <NewsContainer
                    newsData = {this.state.newsList} />
                </div>
            </div>
        )
    }
}


