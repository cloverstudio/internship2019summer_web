import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class RequestItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: props.item
    }
  }

  render(){
    return (
      <li className="collection-item">
        <Link to={`/Requests/${this.state.item.ID}`}>{this.state.item.Title}</Link>
      </li>
    )
  }
}


export default RequestItem;
