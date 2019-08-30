import React, { Component } from 'react';

export default class EditNews extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             redirectToEditNews: false
        }
    }
    

    render() {
        if (this.state.redirectToEditNews === true) {
            return <Redirect to="/News/:editNews" />
        }
        return (
            <div>
                
            </div>
        )
    }
}
