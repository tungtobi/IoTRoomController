import React, { Component } from "react";
import ReactLoading from "react-loading";

import "./style.css";

class Loading extends Component {
  render() {
    return (
      <div className="loading-holder">
        <div className="text-center">
          <ReactLoading
            type="bars"
            color="#999999"
            width="200px"
            height="200px"
            className="d-inline-block"
          />
          <h3 style={{ color: "#999999" }}>Loading</h3>
        </div>
      </div>
    );
  }
}

export default Loading;
