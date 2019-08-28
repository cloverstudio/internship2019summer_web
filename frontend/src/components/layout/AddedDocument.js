import React, { Component } from 'react';
import trash_can_icon from '../../assets/trash_can_icon.svg';
import {Image } from 'react-bootstrap';

export class AddedDocument extends Component {
    render() {
        return (
            <div className='added-document'>
                <Image/>
                <p></p>
                <div>
                    <Image src={trash_can_icon} style={{background:'#0076ff'}} />
                </div>
            </div>
        )
    }
}

export default AddedDocument
