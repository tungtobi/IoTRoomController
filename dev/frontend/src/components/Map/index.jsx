import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import "./style.css";

class SimpleMap extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDrB9CBk5Z0DOtwo03MgMZF8I3Es5_-dhc" }}
          defaultCenter={this.props.defaultCenter}
          center={this.props.center}
          defaultZoom={this.props.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
