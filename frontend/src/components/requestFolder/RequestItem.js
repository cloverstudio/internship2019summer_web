import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {CardDeck, Card} from 'react-bootstrap'


export class RequestItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: props.item,
      redirectDetails: false
    }
  }

  setRedirectToDetails = (e) => {
    e.preventDefault();
    this.setState({
        redirectDetails: true
    });
} 

render(){
    if (this.state.redirectDetails) {
      return <Redirect to={{
        pathname:`/Requests/${this.state.item.ID}`,
        state: {item: this.props.item}
      }}/>
    }

    return (
      <li className="grid-item">
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title> 
                <div onClick={this.setRedirectToDetails}>
                  <a href="#">
                    {this.state.item.Title}
                  </a> 
                </div>
              </Card.Title>
              <Card.Text>
                {this.state.item.message}
              </Card.Text>
              <Card.Text>
                {this.state.item.Address}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </li>
      
    )
  }
}


export default RequestItem;
