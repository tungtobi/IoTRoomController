import React, { Component } from "react";
import loading from "../../img/loading.gif";
import "./style.css";
import { Image } from "react-bootstrap";

class Loading extends Component {
  render() {
    return (
      <div className="loading-holder ">
        <div className="text-center pb-4">
          <Image src={loading} alt="loadign" />
          <h3 className="mt-4">Loading</h3>
        </div>
      </div>
    );
  }
}

export default Loading;
