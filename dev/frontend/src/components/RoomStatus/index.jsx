import React, { Component } from "react";
import Dashboard from "../Dashboard/index";
import "./index.css";
class RoomStatus extends Component {
  state = {};
  render() {
    return (
      <div className="dashboard">
        <div className="card">
          <Dashboard
            title={this.props.roomStatusData.AQI.title}
            options={this.props.roomStatusData.AQI.options}
            series={this.props.roomStatusData.AQI.series}
          ></Dashboard>
        </div>
        <div className="card">
          <Dashboard
            title={this.props.roomStatusData.Temperature.title}
            options={this.props.roomStatusData.Temperature.options}
            series={this.props.roomStatusData.Temperature.series}
          ></Dashboard>
        </div>
        <div className="card">
          <Dashboard
            title={this.props.roomStatusData.Humidity.title}
            options={this.props.roomStatusData.Humidity.options}
            series={this.props.roomStatusData.Humidity.series}
          ></Dashboard>
        </div>
      </div>
    );
  }
}

export default RoomStatus;
