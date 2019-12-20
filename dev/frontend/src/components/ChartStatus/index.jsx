import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./index.css";
import { Card } from "react-bootstrap";

class ChartStatus extends Component {
  render() {
    return (
      <Card className="panel-item app devices mixed-chart">
        <h5 className="card-title ml-4">{this.props.title}</h5>
        <Chart
          id="chart"
          options={this.props.options}
          series={this.props.series}
          type="area"
          width="100%"
        />
      </Card>
    );
  }
}

export default ChartStatus;
