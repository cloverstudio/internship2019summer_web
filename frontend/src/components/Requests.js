import React, { Component } from 'react'
import RequestItem from './RequestItem';
import add_icon from '../assets/add_icon.svg';
import SideBar from './layout/SideBar';
import {CardDeck, Card} from 'react-bootstrap'

export class Requests extends Component {
  constructor(){
    super();
    this.state = {
      requests: []
    }
  }

  componentWillMount(){
    this.getRequests();
  }


  async getRequests(){
    console.log(localStorage.getItem('token'));
    try {
      
      await fetch('https://intern2019dev.clover.studio/requests/myRequests', 
      //admin 'https://intern2019dev.clover.studio/requests/all'
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
        method: 'GET'
      }).then(async (response) =>{
        const json = await response.json();
        console.log(json.data.requests);
        this.setState({
          requests: json.data.requests
        });
    })
    } catch (err) {
      console.log(err)
    }
   
  }


    render() {
      const RequestItems = this.state.requests.map((request, i) => {
        console.log(request);
        return(
          <RequestItem key={request.ID} item={request} />
        )
      })

      return (
        <div style={{display:'flex'}}>
           <SideBar />
            <div className="requests-container-gray">
              <div className="new-requests-container">
                <Card style={{border: 'none'}}>
                <a className="requests-icon" href="/NewRequest"> 
                  <img style= {{maxWidth: "200px"}} src = {add_icon} alt="Add more"/>
                    <div className="requests-text">
                      <p>Novi zahtjev</p>
                    </div>
                </a>
                </Card>
                
              </div>
                <ul className="collection" style={{listStyleType: 'none'}}>
                  {RequestItems}
                </ul>     
            </div>
         </div>
        )
    }
}

export default Requests;
