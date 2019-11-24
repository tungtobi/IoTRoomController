import React, { Component } from "react";
import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";
import DeviceAdditionModal from "../DeviceAdditionModal";
import DeviceEditorModal from "../DeviceEditorModal";
import "./index.css";
import CenteredAlert from "../CenteredAlert";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: {
        userUnavailable: false
      },
      modal: {
        showDeviceEditor: false,
        showDeviceAddition: false,
        showScenarioEditor: false,
        showScenarioAddition: false
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
          link: "/dashboard/history",
          icon: "fas fa-history",
          nameItem: "History"
        },
        {
          link: "#",
          icon: "fas fa-user-circle",
          nameItem: "Account"
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
      },
      indexes: [
        {
          title: "AQI",
          index: "99 PM2.5",
          icon: "fas fa-wind item-icon-green p-3"
        },
        {
          title: "Humidity",
          index: "30 %",
          icon: "fas fa-temperature-low item-icon-red p-3"
        },
        {
          title: "Temperature",
          index: "29 °C",
          icon: "fas fa-tint item-icon-orange p-3"
        }
      ]
    };

    this.showDevEditModal = this.showDevEditModal.bind(this);
    this.hideDevEditModal = this.hideDevEditModal.bind(this);

    this.showDevAddModal = this.showDevAddModal.bind(this);
    this.hideDevAddModal = this.hideDevAddModal.bind(this);

    this.showUserUnavailableAlert = this.showUserUnavailableAlert.bind(this);
    this.hideUserUnavailableAlert = this.hideUserUnavailableAlert.bind(this);
  }

  showUserUnavailableAlert() {
    this.setState({
      alert: {
        userUnavailable: true
      }
    });
  }

  hideUserUnavailableAlert() {
    this.setState({
      alert: {
        userUnavailable: false
      }
    });
  }

  componentDidMount() {
    this.getCurrentWindow();
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

  showDevEditModal() {
    this.setState({ modal: { showDeviceEditor: true } });
  }

  hideDevEditModal() {
    this.setState({ modal: { showDeviceEditor: false } });
  }

  showDevAddModal() {
    this.setState({ modal: { showDeviceAddition: true } });
  }

  hideDevAddModal() {
    this.setState({ modal: { showDeviceAddition: false } });
  }

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
    if (nameWindow === "Account") {
      this.showUserUnavailableAlert();
    } else {
      this.setState({
        nameWindow: nameWindow
      });
    }
  };

  render() {
    return (
      <div className="background-light">
        {/* Device addition modal */}
        <DeviceEditorModal
          show={this.state.modal.showDeviceEditor}
          onHide={this.hideDevEditModal}
        ></DeviceEditorModal>
        <DeviceAdditionModal
          show={this.state.modal.showDeviceAddition}
          onHide={this.hideDevAddModal}
        ></DeviceAdditionModal>
        <CenteredAlert
          title="Tính năng chưa được hỗ trợ"
          btnName="Ok"
          show={this.state.alert.userUnavailable}
          onHide={this.hideUserUnavailableAlert}
          onSubmit={this.hideUserUnavailableAlert}
        >
          Xin lỗi bạn{" "}
          <span>
            <i className="far fa-sad-cry"></i>
          </span>{" "}
          tính năng quản lý người dùng chưa được hỗ trợ trong phiên bản này!
        </CenteredAlert>

        <div className="menu-horizontal">
          <Leftbar
            selected={this.state.nameWindow}
            menuItems={this.state.menuItems}
            avatar={this.state.avatar}
            changeWindow={this.changeWindow}
          />
        </div>
        <div className="dashboard-content">
          <Navbar nameWindow={this.state.nameWindow}></Navbar>
          <RenderWindow
            nameWindow={this.state.nameWindow}
            devicesList={this.state.devicesList}
            devicesScenario={this.state.devicesScenario}
            devicesHistory={this.state.devicesHistory}
            roomStatusLabels={this.state.roomStatusLabels}
            roomStatusData={this.state.roomStatusData}
            indexes={this.state.indexes}
            removeDeviceList={this.removeDeviceList}
            removeDeviceScenario={this.removeDeviceScenario}
            removeDeviceHistory={this.removeDeviceHistory}
            showDevEditModal={this.showDevEditModal}
            showDevAddModal={this.showDevAddModal}
          ></RenderWindow>
        </div>
      </div>
    );
  }
}

export default Header;
