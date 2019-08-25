import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


class MapContainer extends Component {
  render() {
    return (
      <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 45.815399, lng: 15.966568}} >
          <Marker position={{ lat: 45.815399, lng: 15.966568}} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDEeuFFoNOKslNPHeax_QQdeylmNP890GY'
})(MapContainer);

const mapStyles = {
  width: '400px',
  height: '200px',
};