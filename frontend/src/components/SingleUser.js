import React, { Component } from 'react'

const SingleUser = ({name, email, img}) =>{
        return (
            <div>
                <img src={img} alt=""/>
                <div>
                    <h2>{name}</h2>
                    <p>{email}</p>
                </div>
            </div>
        );
}


export default SingleUser;