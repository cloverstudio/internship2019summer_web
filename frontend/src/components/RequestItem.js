import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {CardDeck, Card} from 'react-bootstrap'


export class RequestItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: props.item,
      RedirectDetails: false
    }
  }

  setRedirectDetails = () => {
    this.setState({
      RedirectDetails: true,
      state: { items: this.props.item },
  
    })
  }  

  render(){
    return (
      <li className="collection-item">
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title> 
            
              {/* <Redirect to={{
                  pathname: `/Requests/${this.state.item.ID}`,
                  state: { items: this.props.item }
                }}></Redirect> */}
                
                <Link 
                  to={`/Requests/${this.state.item.ID}`}
                  onClick={this.setRedirectDetails}
                  >
                {this.state.item.Title}</Link> 

              </Card.Title>
              <Card.Text>
                {this.state.item.message}
              </Card.Text>
              <Card.Text>
                {this.state.item.Address}
              </Card.Text>
            </Card.Body>
            <Card.Footer>


            </Card.Footer>
          </Card>
        </CardDeck>
      </li>
      
    )
  }
}


export default RequestItem;
