import React, { Component } from "react";
import ChartStatus from "../ChartStatus/index";
import { current } from "../../services/iot";

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

    let categories = [];

    const LASTEST = new Date(data[data.length - 1].Date);

    const STEP = 3; // 3 minutes;

    let currentTime = new Date(data[0].Date).getTime();

    let index = 0;

    while (currentTime <= LASTEST.getTime()) {
      const currentDate = new Date(currentTime);
      let currentData = data.find(d => {
        const tmpDate = new Date(d.Date);
        return (
          tmpDate.getHours() === currentDate.getHours() &&
          tmpDate.getMinutes() === currentDate.getMinutes()
        );
      });

      if (!currentData) {
        currentData = {
          AQI: indexes2Chart.AQI[index - 1],
          Humidity: indexes2Chart.Humidity[index - 1],
          Temperature: indexes2Chart.Temperature[index - 1],
          Date: categories[index - 1]
        };
      }

      indexes2Chart.AQI[index] = currentData.AQI;
      indexes2Chart.Humidity[index] = currentData.Humidity;
      indexes2Chart.Temperature[index] = currentData.Temperature;
      categories[index] = currentData.Date;

      index++;
      currentTime += STEP * 60000;
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
