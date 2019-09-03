import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {CardDeck, Card, Row, Col} from 'react-bootstrap'


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
      <Col md="4">
        <Card>
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
              <Card.Img variant="top" src="https://via.placeholder.com/150x100" />
              <Card.Text>
                {this.state.item.Address}
              </Card.Text>
            </Card.Body>
          </Card>
      </Col>
      
    )
  }
}


export default RequestItem;
