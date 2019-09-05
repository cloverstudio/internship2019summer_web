import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';



export default class NewsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkToPhoto: 'https://intern2019dev.clover.studio/uploads/files/',
            redirectToEditNews: false
        }
    }

    redirectToEditNews = () => {
        this.setState({
            redirectToEditNews: true
        })
    }



    render() {
        if (this.state.redirectToEditNews) {
            return <Redirect to={{
                pathname: '/News/:ID',
                state: { editNewsProps: this.props }
            }}/>
        }

        return (


            <Card className="news-card"
                style={{ background: "white", height: "400px ", width: "300px", color: '#0076ff', margin: '20px' }}
                onClick={this.redirectToEditNews}>
                <Image src={this.state.linkToPhoto+`${this.props.newsList.Images}`} style={{ height: '150px', width: '100%' }} />
                <p className="title">{this.props.newsList.Title}</p>
                <p className="text">{this.props.newsList.Message}</p>
                <div className='author-date' style={{ display: 'flex' }}>
                    <p className="author">Autor: {this.props.newsList.firstName} {this.props.newsList.lastName}</p>
                    <p className="date">{this.props.newsList.CreatedAt}</p>
                </div>
            </Card>

        )
    }
}
