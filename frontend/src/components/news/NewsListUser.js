import React from 'react';
import NewsContainerUser from './NewsContainerUser';

const NewsListUser = ({ newsList }) => {

    return (
        <div className="news-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            { 
            
                newsList.map((newsList, i) => {
                    return(
                    <div key={i}>
                        <NewsContainerUser
                            newsData={newsList} />
                    </div>
                    )
                })
            

        }

        </div>
    )



}

export default NewsListUser