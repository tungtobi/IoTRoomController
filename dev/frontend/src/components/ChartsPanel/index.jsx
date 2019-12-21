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

    const RES_STEP = 1; // 1 minute

    const X_STEP = 60; // 1 hour

    const DELTA_STEP = 1; //Math.floor(X_STEP / RES_STEP);

    const NUM_XAXIS = Math.ceil(data.length / DELTA_STEP);

    let categories = [];

    for (var i = NUM_XAXIS - 1; i >= 0; i--) {
      let idx = i * DELTA_STEP;

      if (i === NUM_XAXIS - 1) idx = Math.max(i * DELTA_STEP, data.length - 1);

      indexes2Chart.AQI[i] = data[idx].AQI;
      indexes2Chart.Humidity[i] = data[idx].Humidity;
      indexes2Chart.Temperature[i] = data[idx].Temperature;
      categories[i] = data[idx].Date;
    }

    let prev = { ...state };
    prev.Temperature.series[0].data = indexes2Chart.Temperature;
    prev.Humidity.series[0].data = indexes2Chart.Humidity;
    prev.AQI.series[0].data = indexes2Chart.AQI;
    prev.options.xaxis.categories = categories;

    return prev;
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
