import React from 'react'
import add_icon from '../../assets/add_icon.svg';

export default function NewUserUI() {
    return (
        <button className="btn-new-user">
            <svg>
                <use>{add_icon}</use>
            </svg>
            <p>Kreiraj korisnika</p>
        </button>
    )
}
