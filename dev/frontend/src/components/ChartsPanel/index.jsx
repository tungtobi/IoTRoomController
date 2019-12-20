import React, { Component } from "react";
import ChartStatus from "../ChartStatus/index";

class ChartsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Temperature: {
        title: "Temperature",
        series: [
          {
            name: "Temperature",
            data: []
          }
        ]
      },
      Humidity: {
        title: "Humidity",
        series: [
          {
            name: "Humidity",
            data: []
          }
        ]
      },
      AQI: {
        title: "AQI",
        series: [
          {
            name: "AQI",
            data: []
          }
        ]
      },
      options: {
        chart: {
          stacked: false,
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: [],
          labels: { show: false }
        }
      }
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.data) return null;

    const { data } = props;

    let indexes2Chart = {
      AQI: [],
      Humidity: [],
      Temperature: []
    };

    const lengthData = data.length - 1;
    var index_array = lengthData;
    var deltaTime = 1;
    var num_xaxis = Math.floor(lengthData / deltaTime);

    let categories = [];

    for (var i = num_xaxis; i >= 0; i--) {
      // Chi so de tao chart
      indexes2Chart.AQI[index_array] = data[i * deltaTime].AQI;
      indexes2Chart.Humidity[index_array] = data[i * deltaTime].Humidity;
      indexes2Chart.Temperature[index_array] = data[i * deltaTime].Temperature;

      categories[index_array] = data[i * deltaTime].Date;

      index_array--;
    }

    return {
      Temperature: {
        series: [{ name: "Temperature", data: indexes2Chart.Temperature }]
      },
      AQI: {
        series: [{ name: "AQI", data: indexes2Chart.AQI }]
      },
      Humidity: {
        series: [{ name: "Humidity", data: indexes2Chart.Humidity }]
      },
      options: { xaxis: { categories, labels: { show: false } } }
    };
  }

  render() {
    return (
      <div className="panel">
        <ChartStatus
          options={this.state.options}
          title={this.state.AQI.title}
          series={this.state.AQI.series}
        />
        <ChartStatus
          options={this.state.options}
          title={this.state.Humidity.title}
          series={this.state.Humidity.series}
        />
        <ChartStatus
          options={this.state.options}
          title={this.state.Temperature.title}
          series={this.state.Temperature.series}
        />
      </div>
    );
  }
}

export default ChartsPanel;
