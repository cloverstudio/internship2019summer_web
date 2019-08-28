import React, { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import OpenNews from './OpenNews';



export class NewsContainerUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkToPhoto: 'https://intern2019dev.clover.studio/uploads/photos/',
            redirectToOpenNews: false,
        }
    }

    redirectToOpenNews = () => {
        this.setState({
            redirectToOpenNews: true
        })
    }



    render() {
        if (this.state.redirectToOpenNews) {
            return <Redirect to={{
                pathname: '/NewsUser/:openNews',
                state: { openNewsProps: this.props }
            }}
                />
          }
          console.log(this.props.newsData)


        return (


            <Card className="news-card"
                style={{ background: "white", height: "400px ", width: "300px", color: '#0076ff', margin: '20px' }}
                onClick={this.redirectToOpenNews}>
                <Image src={this.props.newsData.Images} style={{ height: '150px', width: '100%' }} />
                <p className="title">{this.props.newsData.Title}</p>
                <p className="text">{this.props.newsData.Message}</p>
                <div className='author-date' style={{ display: 'flex' }}>
                    <p className="author">Autor: {this.props.newsData.firstName} {this.props.newsData.lastName}</p>
                    <p className="date">{this.props.newsData.CreatedAt}</p>
                </div>
            </Card>

        )
    }
}

export default NewsContainerUser

