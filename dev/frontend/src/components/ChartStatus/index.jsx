import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./index.css";
import { Card } from "react-bootstrap";

class ChartStatus extends Component {
  render() {
    const options = {
      chart: {
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false,
            customIcons: []
          },
          autoSelected: "zoom"
        }
      }
    };

    const { series, theme, categories, title } = this.props;

    return (
      <Card className="panel-item app devices mixed-chart">
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Chart
            options={{
              ...options,
              theme,
              xaxis: {
                categories,
                labels: { show: false }
              }
            }}
            series={series}
            type="area"
            width="100%"
          />
        </Card.Body>
      </Card>
    );
  }
}

export default ChartStatus;
