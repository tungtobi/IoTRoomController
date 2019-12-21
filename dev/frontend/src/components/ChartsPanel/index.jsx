import React, { Component } from "react";
import ChartStatus from "../ChartStatus/index";
import convertIndexesToChart from "../../logic/indexesToChart";

class ChartsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Temperature: {
        title: "Temperature",
        color: "#ff6347",
        series: [
          {
            name: "Temperature",
            data: []
          }
        ]
      },
      Humidity: {
        title: "Humidity",
        color: "#007bff",
        series: [
          {
            name: "Humidity",
            data: []
          }
        ]
      },
      AQI: {
        title: "AQI",
        color: "#008000",
        series: [
          {
            name: "AQI",
            data: []
          }
        ]
      },
      categories: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.data) return null;

    const { data } = props;

    const result = convertIndexesToChart(data);

    let prev = { ...state };
    prev.Temperature.series[0].data = result.Temperature;
    prev.Humidity.series[0].data = result.Humidity;
    prev.AQI.series[0].data = result.AQI;
    prev.categories = result.categories;

    return prev;
  }

  render() {
    return (
      <div className="panel">
        {["AQI", "Humidity", "Temperature"].map((item, idx) => {
          const { color, title, series } = this.state[item];
          return (
            <ChartStatus
              key={idx}
              theme={{
                mode: "light",
                monochrome: {
                  enabled: true,
                  color,
                  shadeTo: "light",
                  shadeIntensity: 0.65
                }
              }}
              title={title}
              series={series}
            />
          );
        })}
      </div>
    );
  }
}

export default ChartsPanel;
