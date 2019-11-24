import React, { Component } from "react";

class ForecastDetail extends Component {
  render() {
    const info = this.props.info;

    return (
      <div>
        <div>
          <p>Nhiệt độ: {info ? info.main.temp : 0}</p>
          <p>Nhiệt độ tối thiểu: {info ? info.main.temp : 0}</p>
        </div>
      </div>
    );
  }
}

export default ForecastDetail;
