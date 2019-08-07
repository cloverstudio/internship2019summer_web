import React, { Component } from 'react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';

export default class Profile extends Component {
    render() {
        return (
            <div>
                <ProfileInfo/>
                <ChangePassword/>
            </div>
        )
    }
}
