import React, { Component } from "react";

class Unavailable extends Component {
  render() {
    return (
      <div className="loading-holder">
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
