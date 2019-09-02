import React, { Component } from 'react'
import RequestItem from './RequestItem';
import add_icon from '../../assets/add_icon.svg';
import SideBar from '../layout/SideBar';
import NoNewRequests from '../requestFolder/NoNewRequests';
import { Card} from 'react-bootstrap';

export class Requests extends Component {
  constructor() {
    super();

    this.requests=[];
    this.state = {
      filteredRequests: [],
      loadingDone: false
    }
  }

  componentWillMount() {
    this.getRequests();
  }


  async getRequests() {
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
        }).then(async (response) => {
          const json = await response.json();
          console.log(json.data.requests);

          this.requests=json.data.requests;
          this.setState({
            filteredRequests: json.data.requests,
            loadingDone: true
          });
        })
    } catch (err) {
      console.log(err)
    }
  }

  filterRequests = () => {
    let wantedType = this.refs.Request_type.value;

    let allRequests = this.requests;
    var filteredRequests = allRequests.filter(request => {

      if (wantedType !== 'sve')
        return request.Request_type === wantedType

      return request;

    });
    this.setState({
      filteredRequests: filteredRequests
    });
  }

  render() {
    const RequestItems = this.state.filteredRequests.map((request, i) => {
      return (
        <RequestItem key={request.ID} item={request} />
      )
    })

    if (this.state.loadingDone === false) {
      return (
        <div style={{ display: 'flex' }}>
          <SideBar />
          <div className="requests-container-gray">
          </div>
        </div>
      )
    }

    if (this.state.loadingDone && this.requests.length == 0) {
      return (
        <div style={{ display: 'flex' }}>
          <SideBar />
          <div className="requests-container-gray">
            <NoNewRequests />
          </div>
        </div>
      )
    }

    return (
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div className="requests-container-gray">

          <div className="filter-type">
            <div className="input-field">
              <select 
                className="filter"
                ref="Request_type" 
                onChange={this.filterRequests.bind(this)}
              >
                <option value="sve" name="sve">Sve</option>
                <option value="kvar" name="kvar">Kvar</option>
                <option value="prijedlog" name="prijedlog">Prijedlog</option>
              </select>
            </div>
          </div>
            <div className="grid-container">
              <div className="grid-item new-requests-container">
                <Card style={{ border: 'none' }}>
                  <a className="requests-icon" href="/NewRequest">
                    <img style={{ maxWidth: "200px" }} src={add_icon} alt="Add more" />
                    <div className="requests-text">
                      <p>Novi zahtjev</p>
                    </div>
                  </a>
                </Card>
              </div>
              <div className="">
                <ul className="grid-item">
                  {RequestItems}
                </ul>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Requests;
