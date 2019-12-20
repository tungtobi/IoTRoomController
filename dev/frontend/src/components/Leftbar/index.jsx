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
        {
          link: "/dashboard/remotes",
          icon: "fas fa-gamepad",
          nameItem: "Remotes"
        },
        {
          link: "/dashboard/accounts",
          icon: "fas fa-user-circle",
          nameItem: "Accounts"
        }
      ],
      selected: "Room Status"
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
    const { menuItems } = this.state;
    const length = menuItems.length;

    const finalMenu =
      this.props.isAdmin === true ? menuItems : menuItems.slice(0, length - 1);

    return (
      <div>
        <div className="leftbar d-none d-md-block">
          <Avatar avatar={this.props.avatar}></Avatar>
          <Menu
            selected={this.state.selected}
            menuItems={finalMenu}
            changeWindow={this.changeWindow}
          ></Menu>
        </div>
        <div className="leftbar d-block d-md-none max-width-59">
          <div className="small-logo"></div>
          <MenuNoTitle
            selected={this.state.selected}
            menuItems={finalMenu}
            changeWindow={this.changeWindow}
          ></MenuNoTitle>
        </div>
      </div>
    );
  }
}

export default Leftbar;
