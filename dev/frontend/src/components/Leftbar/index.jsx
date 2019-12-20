import React, { Component } from "react";
import Avatar from "../Avatar";
import Menu from "../Menu";
import MenuNoTitle from "../MenuNoTitle";
import "./index.css";
class Leftbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      ]
    };

    this.changeWindow = this.changeWindow.bind(this);
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
      selected: selected.nameItem
    });
  }

  changeWindow = nameWindow => {
    this.setState({
      selected: nameWindow
    });
  };

  render() {
    return (
      <div>
        <div className="leftbar d-none d-md-block">
          <Avatar avatar={this.props.avatar}></Avatar>
          <Menu
            selected={this.state.selected}
            menuItems={this.state.menuItems}
            changeWindow={this.changeWindow}
          ></Menu>
        </div>
        <div className="leftbar d-block d-md-none max-width-59">
          <div className="small-logo"></div>
          <MenuNoTitle
            selected={this.props.selected}
            menuItems={this.state.menuItems}
            changeWindow={this.props.changeWindow}
          ></MenuNoTitle>
        </div>
      </div>
    );
  }
}

export default Leftbar;
