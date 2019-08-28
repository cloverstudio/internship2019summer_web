import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {

    render(){
        const mapStyles = {
            position: 'static',
            width: '300px',
            height: '100px',
            marginTop: '40px'
            
          };
        return(
    <Map
    google={this.props.google}
    zoom={10}
    style={mapStyles}
    initialCenter={{ lat: 45.815399, lng: 15.966568}}>
    <Marker position={{ lat: 45.815399, lng: 15.966568}} />
    </Map>
)
}
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCvBZoNVBfFp2Yi7Vv0NTwgRdR0pAcRMFw'
})(MapContainer);