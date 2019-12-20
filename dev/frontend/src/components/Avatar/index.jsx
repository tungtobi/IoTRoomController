import React, { Component } from "react";

import "./index.css";
import logo from "../../img/logo.png";

class Avatar extends Component {
  render() {
    return (
      <div className="avatar mb-2">
        <img
          src={logo}
          alt="logo"
          className="avatar-img rounded-circle float-left"
        ></img>
      </div>
    );
  }
}

export default Avatar;
