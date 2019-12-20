import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./index.css";
import { Card } from "react-bootstrap";

class ChartStatus extends Component {
  render() {
    return (
      <Card className="panel-item app devices mixed-chart">
        <Card.Title>{this.props.title}</Card.Title>
        {/* <h5 className="card-title ml-4"></h5> */}
        <Card.Body>
          <Chart
            options={this.props.options}
            series={this.props.series}
            type="area"
            width="100%"
          />
        </Card.Body>
      </Card>
    );
  }
}

export default ChartStatus;
