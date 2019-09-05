import React from 'react';
import NewsContainer from './NewsContainer';
import AddNewsButton from '../layout/AddNewsButton';


const NewsList = ({ newsList }) => {


    return (
        <div className="news-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <AddNewsButton/>
            { 
            
                newsList.map((newsList, i) => {
                    return(
                        
                    <div key={i}>
                        <NewsContainer
                            newsList={newsList} />
                    </div>
                    )
                })
            

        }

        </div>
    )
}

export default NewsList