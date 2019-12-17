import React, { Component } from "react";
import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";
import { Redirect } from "react-router-dom";

import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: null,
      timeUpdate: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      menuItems: [
        {
          link: "/dashboard",
          icon: "fas fa-chart-line",
          nameItem: "Room Status"
        },
        {
          link: "/dashboard/forecasts",
          icon: "fas fa-cloud-sun",
          nameItem: "Forecasts"
        },
        {
          link: "/dashboard/devices",
          icon: "fas fa-tv",
          nameItem: "Devices"
        },
        {
          link: "/dashboard/remotes",
          icon: "fas fa-gamepad",
          nameItem: "Remotes"
        },
        {
          link: "/dashboard/history",
          icon: "fas fa-history",
          nameItem: "History"
        },
        {
          link: "/dashboard/accounts",
          icon: "fas fa-user-circle",
          nameItem: "Accounts"
        }
      ],
      avatar: {
        src:
          "https://yt3.ggpht.com/a/AGF-l7-rOqnsoRaW8LTM75Y2vuElIySnOe18OPUNnA=s900-c-k-c0xffffffff-no-rj-mo",
        name: "Nguyen Viet Linh"
      },
      devicesList: [
        {
          id: "1",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Active",
          accounts: ["Dad", "Mom"]
        },
        {
          id: "2",
          name: "Projector Test",
          seria: "C03TD0QJHV4",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Active",
          accounts: ["Dad", "Mom", "Bro"]
        },
        {
          id: "3",
          name: "Projector Test",
          seria: "C03TD0QJHV5",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Deactive",
          accounts: ["Dad", "Mom"]
        }
      ],
      devicesScenario: [
        {
          code: "123",
          id: "1",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          operator: "Turn on",
          time: "04:00 pm",
          note: "...."
        },
        {
          code: "234",
          id: "2",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          operator: "Turn off",
          time: "07:00 am",
          note: "...."
        }
      ],
      devicesHistory: [
        {
          date: "Yesterday",
          histories: [
            {
              id: "1",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn on",
              time: "04:00 pm",
              note: "...."
            },
            {
              id: "2",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn off",
              time: "07:00 am",
              note: "...."
            }
          ]
        },
        {
          date: "Futherday",
          histories: [
            {
              id: "1",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn on",
              time: "05:00 pm",
              note: "...."
            },
            {
              id: "2",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn off",
              time: "07:00 am",
              note: "...."
            }
          ]
        }
      ],
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
    console.log(
      "Length data when call handUpdateData(): ",
      this.state.data.length
    );
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
      },
      () => console.log(this.state)
    );
    console.log(this.state.roomStatusData.AQI.series[0].data);
  }

  fetchData() {
    fetch(`http://ec2-54-237-117-36.compute-1.amazonaws.com/SensorData`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        this.setState({
          data: data
        });
      })
      .catch(console.log);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    this.setState({ isLogin: token !== null });

    this.getCurrentWindow();
    this.handUpdateData();
  }

  getCurrentWindow() {
    const path = window.location.href;
    const selected = [...this.state.menuItems]
      .reverse()
      .find(item => path.includes(item.link));

    this.setState({
      nameWindow: selected.nameItem
    });
  }

  changeWindow = nameWindow => {
    this.setState({
      nameWindow: nameWindow
    });
  };

  render() {
    if (this.state.isLogin === false) return <Redirect to="/" />;

    return (
      <div className="background-light">
        <div className="menu-horizontal">
          <Leftbar
            selected={this.state.nameWindow}
            menuItems={this.state.menuItems}
            avatar={this.state.avatar}
            changeWindow={this.changeWindow}
          />
        </div>
        <div className="nav-fixed-top">
          <Navbar nameWindow={this.state.nameWindow}></Navbar>
        </div>
        <div className="dashboard-content">
          <RenderWindow
            timeUpdate={this.state.timeUpdate}
            nameWindow={this.state.nameWindow}
            devicesList={this.state.devicesList}
            devicesScenario={this.state.devicesScenario}
            devicesHistory={this.state.devicesHistory}
            roomStatusLabels={this.state.roomStatusLabels}
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
