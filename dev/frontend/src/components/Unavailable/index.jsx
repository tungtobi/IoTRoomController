import React, { Component } from "react";
import "./style.css";

class Unavailable extends Component {
  render() {
    return (
      <div className="unavailabe-holder">
        <div className="text-center glow-blue">
          <div className="big-not-found">
            <i className="fas fa-unlock-alt" />
          </div>
          <h3>This Feature Is Unavailable</h3>
        </div>
      </div>
    );
  }
}

export default Unavailable;
