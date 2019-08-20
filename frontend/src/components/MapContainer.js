import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



class MapContainer extends Component {
  render() {
    return (
      <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 45.815399, lng: 15.966568}} >
          <Marker position={{ lat: 45.815399, lng: 15.966568}} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhzyMH_3oGO5v1SeePjtPxK8nHB801E_w'
})(MapContainer);

const mapStyles = {
  width: '500px',
  height: '200px',
};