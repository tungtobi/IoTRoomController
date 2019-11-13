import React, { Component } from "react";
import Navbar from "../Navbar/index";
import Leftbar from "../Leftbar/index";
import RenderWindow from "../RenderWindow/index";
import "./index.css";

class Header extends Component {
  state = {
    nameWindow: "Room Status",
    menuItems: [
      { link: "#", icon: "fas fa-chart-line", nameItem: "Room Status" },
      { link: "#", icon: "fas fa-tv", nameItem: "Devices" },
      { link: "#", icon: "fas fa-history", nameItem: "History" },
      { link: "#", icon: "fas fa-user-circle", nameItem: "Account" }
    ],
    avatar: {
      src:
        "https://i-vnexpress.vnecdn.net/2019/08/14/johnvupng-1565717211_100x100.png",
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
    roomStatusLabels: ["Temperature", "Humidity", "AQI"],
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
              "10 - 11",
              "11 - 11",
              "12 - 11",
              "13 - 11",
              "14 - 11",
              "15 - 11",
              "16 - 11",
              "17 - 11",
              "18 - 11",
              "19 - 11"
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
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91, 56, 35]
          }
        ]
      },
      Humidity: {
        title: "Humidity",
        options: {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      },
      AQI: {
        title: "AQI",
        options: {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      }
    }
  };

  removeDeviceList = seria => {
    const devicesList = this.state.devicesList.filter(d => d.seria !== seria);
    this.setState({ devicesList });
  };

  removeDeviceScenario = code => {
    const devicesScenario = this.state.devicesScenario.filter(
      d => d.code !== code
    );
    this.setState({ devicesScenario });
  };

  removeDeviceHistory = seria => {};

  changeDevice = seria => {};

  changeWindow = nameWindow => {
    this.setState({
      nameWindow: nameWindow
    });
  };

  render() {
    return (
      <div>
        <span className="menu-horizontal .bg-primary">
          <Leftbar
            menuItems={this.state.menuItems}
            avatar={this.state.avatar}
            changeWindow={this.changeWindow}
          />
        </span>
        <span className="chuaNghiRaTen">
          <Navbar nameWindow={this.state.nameWindow}></Navbar>
        </span>
        <span className="chuaNghiRaTen">
          <RenderWindow
            nameWindow={this.state.nameWindow}
            devicesList={this.state.devicesList}
            devicesScenario={this.state.devicesScenario}
            devicesHistory={this.state.devicesHistory}
            roomStatusLabels={this.state.roomStatusLabels}
            roomStatusData={this.state.roomStatusData}
            removeDeviceList={this.removeDeviceList}
            removeDeviceScenario={this.removeDeviceScenario}
            removeDeviceHistory={this.removeDeviceHistory}
          ></RenderWindow>
        </span>
      </div>
    );
  }
}

export default Header;
