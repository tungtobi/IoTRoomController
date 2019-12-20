import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";

import * as userServices from "../../services/user";

import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: null,
      profile: null,

      timeUpdate: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      roomStatusData: {
        Temperature: {
          title: "Temperature",
          options: {
            legend: {
              float: false,
              position: "bottom", // whether to position legends in 1 of 4
              // direction - top, bottom, left, right
              horizontalAlign: "center", // when position top/bottom, you can
              // specify whether to align legends
              // left, right or center
              verticalAlign: "middle"
            },
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
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
          series: [
            {
              name: "Temperature",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        Humidity: {
          title: "Humidity",
          options: {
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
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
          series: [
            {
              name: "Humidity",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        AQI: {
          title: "AQI",
          options: {
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
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
          series: [
            {
              name: "AQI",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      },
      indexes: [
        {
          title: "AQI",
          index: "0 PM2.5",
          icon: "fas fa-wind item-icon-green p-3"
        },
        {
          title: "Humidity",
          index: "0 %",
          icon: "fas fa-tint item-icon-blue p-3"
        },
        {
          title: "Temperature",
          index: "0 °C",
          icon: "fas fa-temperature-low item-icon-orange p-3"
        }
      ],
      data: []
    };

    this.handUpdateData = this.handUpdateData.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleFetchProfileSuccess = this.handleFetchProfileSuccess.bind(this);
  }

  handUpdateData() {
    var currentSeconds = new Date().getSeconds(); //Current Seconds
    var currentMinutes = new Date().getMinutes(); //Current Minutes
    var currentHours = new Date().getHours(); //Current Hours
    this.setState({
      timeUpdate: {
        seconds: currentSeconds,
        minutes: currentMinutes,
        hours: currentHours
      }
    });

    this.fetchData();
    // console.log(
    //   "Length data when call handUpdateData(): ",
    //   this.state.data.length
    // );
    this.changeValue();
  }

  changeValue() {
    if (this.state.data.length === 0) {
      return;
    }
    var lengthData = this.state.data.length - 1;
    var num_xaxis = Math.floor(lengthData / 60);
    var indexes2Chart = {
      AQI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Humidity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Temperature: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    var i;
    var index_array = 9;
    for (i = num_xaxis; i >= 0; i--) {
      indexes2Chart.AQI[index_array] = this.state.data[i * 60].AQI;
      indexes2Chart.Humidity[index_array] = this.state.data[i * 60].Humidity;
      indexes2Chart.Temperature[index_array] = this.state.data[
        i * 60
      ].Temperature;
      index_array--;
    }

    var series_AQI = [
      {
        name: "AQI",
        data: indexes2Chart.AQI
      }
    ];

    var series_Humidity = [
      {
        name: "Humidity",
        data: indexes2Chart.Humidity
      }
    ];

    var series_Temperature = [
      {
        name: "Temperature",
        data: indexes2Chart.Temperature
      }
    ];

    var now_AQI = this.state.data[lengthData - 1].AQI;
    var now_Humidity = this.state.data[lengthData - 1].Humidity;
    var now_Temperature = this.state.data[lengthData - 1].Temperature;

    var now_index_AQI = now_AQI.toString() + " PM2.5";
    var now_index_Humidity = now_Humidity.toString() + " %";
    var now_index_Temperature = now_Temperature.toString() + " °C";

    var now_indexes = [
      {
        title: "AQI",
        index: now_index_AQI,
        icon: "fas fa-wind item-icon-green p-3"
      },
      {
        title: "Humidity",
        index: now_index_Humidity,
        icon: "fas fa-tint item-icon-blue p-3"
      },
      {
        title: "Temperature",
        index: now_index_Temperature,
        icon: "fas fa-temperature-low item-icon-orange p-3"
      }
    ];

    this.setState(
      {
        indexes: now_indexes,
        roomStatusData: {
          ...this.state.roomStatusData,
          AQI: {
            ...this.state.roomStatusData.AQI,
            series: series_AQI
          },
          Humidity: {
            ...this.state.roomStatusData.Humidity,
            series: series_Humidity
          },
          Temperature: {
            ...this.state.roomStatusData.Temperature,
            series: series_Temperature
          }
        }
      }
      // () => console.log(this.state)
    );
    // console.log(this.state.roomStatusData.AQI.series[0].data);
  }

  fetchData() {
    fetch(`http://ec2-54-237-117-36.compute-1.amazonaws.com/SensorData`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);

        this.setState({
          data: data
        });
      })
      .catch(console.log);
  }

  async fetchProfile() {
    await userServices.view(this.handleFetchProfileSuccess, console.log);
  }

  handleFetchProfileSuccess(res) {
    const { error_code, ...profile } = res;

    this.setState({ profile });
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isLogin: token !== null });

    this.handUpdateData();
    this.fetchProfile();
  }

  render() {
    if (this.state.isLogin === false) return <Redirect to="/" />;

    const username = this.state.profile ? this.state.profile.username : null;

    return (
      <div className="background-light">
        <div className="menu-horizontal">
          <Leftbar />
        </div>
        <div className="nav-fixed-top">
          <Navbar profile={this.state.profile}></Navbar>
        </div>
        <div className="dashboard-content">
          <RenderWindow
            username={username}
            timeUpdate={this.state.timeUpdate}
            roomStatusData={this.state.roomStatusData}
            indexes={this.state.indexes}
            handUpdateData={this.handUpdateData}
          ></RenderWindow>
        </div>
      </div>
    );
  }
}

export default Header;
