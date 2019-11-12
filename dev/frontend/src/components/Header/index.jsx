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
    ]
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
        <span className="float-righ">
          <RenderWindow
            nameWindow={this.state.nameWindow}
            devicesList={this.state.devicesList}
            devicesScenario={this.state.devicesScenario}
            devicesHistory={this.state.devicesHistory}
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
