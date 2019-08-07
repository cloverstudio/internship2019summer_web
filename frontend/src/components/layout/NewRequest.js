import React, { Component } from 'react'
import add_icon from '../../assets/add_icon.svg';

export class NewRequest extends Component {
    render() {
        return (
            <div>
                <img style= {{maxWidth: "200px"}} src = {add_icon} />
                <p>Kreiraj novi zahtjev</p>
            </div>
        )
    }
}

export default NewRequest
