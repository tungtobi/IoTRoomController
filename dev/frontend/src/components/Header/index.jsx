import React, { Component } from "react";
import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";
import { Redirect } from "react-router-dom";
import * as userServices from "../../services/user";
import "./index.css";

class Header extends Component {
  constructor(props) {
    super(props);

    const options = {
      chart: {
        type: "area",
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
        labels: { show: false }
      }
    };

    this.state = {
      isLogin: null,
      profile: null,

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
        // {
        //   link: "/dashboard/devices",
        //   icon: "fas fa-tv",
        //   nameItem: "Devices"
        // },
        {
          link: "/dashboard/remotes",
          icon: "fas fa-gamepad",
          nameItem: "Remotes"
        },
        // {
        //   link: "/dashboard/history",
        //   icon: "fas fa-history",
        //   nameItem: "History"
        // },
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
          chart: {
            zoom: {
              enabled: true,
              type: "x",
              autoScaleYaxis: false
            }
          },
          title: "Temperature",
          options: { ...options },

          series: [
            {
              name: "Temperature",
              data: []
            }
          ]
        },
        Humidity: {
          title: "Humidity",
          options: { ...options },

          series: [
            {
              name: "Humidity",
              data: []
            }
          ]
        },
        AQI: {
          zoom: {
            enabled: true,
            type: "x",
            autoScaleYaxis: false
          },
          title: "AQI",
          options: { ...options },
          series: [
            {
              name: "AQI",
              data: []
            }
          ]
        }
      },
      indexes: [
        {
          title: "AQI",
          index: "-- PM2.5",
          icon: "fas fa-wind item-icon-green p-3"
        },
        {
          title: "Humidity",
          index: "-- %",
          icon: "fas fa-tint item-icon-blue p-3"
        },
        {
          title: "Temperature",
          index: "-- °C",
          icon: "fas fa-temperature-low item-icon-orange p-3"
        }
      ],
      data: []
    };

    this.handUpdateData = this.handUpdateData.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleFetchProfileSuccess = this.handleFetchProfileSuccess.bind(this);

    this.handleFetchDataSuccess = this.handleFetchDataSuccess.bind(this);
    this.handleFetchDataFailed = this.handleFetchDataFailed.bind(this);
  }

  handUpdateData() {
    this.fetchData();
    console.log(
      "Length data before update handUpdateData(): ",
      this.state.data.length
    );
    this.changeValue();
  }

  changeValue() {
    if (this.state.data.length === 0) {
      return;
    }
    var lengthData = this.state.data.length - 1;

    let categories = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var indexes2Chart = {
      AQI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Humidity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Temperature: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    console.log(indexes2Chart);

    var i;
    var index_array = lengthData;
    var deltaTime = 1;
    var num_xaxis = Math.floor(lengthData / deltaTime);
    for (i = num_xaxis; i >= 0; i--) {
      // Chi so de tao chart
      indexes2Chart.AQI[index_array] = this.state.data[i * deltaTime].AQI;
      indexes2Chart.Humidity[index_array] = this.state.data[
        i * deltaTime
      ].Humidity;
      indexes2Chart.Temperature[index_array] = this.state.data[
        i * deltaTime
      ].Temperature;
      // Chuc
      categories[index_array] = this.state.data[i * deltaTime].Date;
      // console.log(
      //   "asfasfdasdfffddfdf: ",
      //   parseInt(this.state.data[i * 60].Date.substring(8, 10), 10)
      // );
      index_array--;
    }

    console.log(indexes2Chart.optionsNew);

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

    console.log(indexes2Chart.optionsNew);

    this.setState(prevState => ({
      indexes: now_indexes,
      roomStatusData: {
        ...prevState.roomStatusData,
        AQI: {
          ...prevState.roomStatusData.AQI,
          options: {
            xaxis: {
              categories
            }
          },
          series: series_AQI
        },
        Humidity: {
          ...prevState.roomStatusData.Humidity,
          options: {
            xaxis: {
              categories
            }
          },
          series: series_Humidity
        },
        Temperature: {
          ...prevState.roomStatusData.Temperature,
          options: {
            xaxis: {
              categories
            }
          },
          series: series_Temperature
        }
      }
    }));
    console.log(
      "Categoties in Temp: ",
      this.state.roomStatusData.Temperature.options.xaxis.categories
    );
  }

  async fetchData() {
    await userServices.data(
      this.handleFetchDataSuccess,
      this.handleFetchDataSuccess
    );
    console.log("Fetching data...");
    this.setState({
      timeUpdate: {
        seconds: -1,
        minutes: -1,
        hours: -1
      }
    });
  }

  handleFetchDataSuccess(data) {
    console.log("Data to render Charts: ", data.result);
    var currentSeconds = new Date().getSeconds(); //Current Seconds
    var currentMinutes = new Date().getMinutes(); //Current Minutes
    var currentHours = new Date().getHours(); //Current Hours

    this.setState({
      data: data.result,
      timeUpdate: {
        seconds: currentSeconds,
        minutes: currentMinutes,
        hours: currentHours
      }
    });
    console.log("Fetch data done!");
  }

  handleFetchDataFailed() {
    this.setState({
      timeUpdate: {
        seconds: -2,
        minutes: -2,
        hours: -2
      }
    });
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

    this.getCurrentWindow();
    this.handUpdateData();
    this.fetchProfile();
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

    const username = this.state.profile ? this.state.profile.username : null;

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
          <Navbar
            profile={this.state.profile}
            nameWindow={this.state.nameWindow}
          ></Navbar>
        </div>
        <div className="dashboard-content">
          <RenderWindow
            username={username}
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
