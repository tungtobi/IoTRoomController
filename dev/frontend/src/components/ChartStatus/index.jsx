import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./index.css";

class ChartStatus extends Component {
  render() {
    return (
      <div className="app devices mixed-chart">
        <h5 className="card-title m-4">{this.props.title}</h5>
        <Chart
          options={this.props.options}
          series={this.props.series}
          type="area"
          width="500px"
        />
      </div>
    );
  }
}

export default ChartStatus;
