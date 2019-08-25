import React, { Component } from 'react';
import { Card, Image } from 'react-bootstrap';


export class NewsContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                {
                    this.props.newsData.map(news => {
                        return (
                            <Card>
                                <Image src={news.Images} />
                                <p class="title">{news.Title}</p>
                                <p class="text">{news.Message}</p>
                                <p class="author">Autor:{news.firstName}{this.props.newsData.lastName}</p>
                                <p class="date">{news.CreatedAt}</p>
                            </Card>
                        )
                    }
                    )
                }
            </div>
        )
    }
}

export default NewsContainer

