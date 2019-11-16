import React, { Component } from "react";
import ChartStatus from "../ChartStatus/index";
import "./index.css";

class ChartsPanel extends Component {
  state = {};
  render() {
    return (
      <div className="panel">
        <span className="card panel-item">
          <ChartStatus
            title={this.props.roomStatusData.AQI.title}
            options={this.props.roomStatusData.AQI.options}
            series={this.props.roomStatusData.AQI.series}
          ></ChartStatus>
        </span>
        <span className="card panel-item">
          <ChartStatus
            title={this.props.roomStatusData.Temperature.title}
            options={this.props.roomStatusData.Temperature.options}
            series={this.props.roomStatusData.Temperature.series}
          ></ChartStatus>
        </span>
        <span className="card panel-item">
          <ChartStatus
            title={this.props.roomStatusData.Humidity.title}
            options={this.props.roomStatusData.Humidity.options}
            series={this.props.roomStatusData.Humidity.series}
          ></ChartStatus>
        </span>
      </div>
    );
  }
}

export default ChartsPanel;
