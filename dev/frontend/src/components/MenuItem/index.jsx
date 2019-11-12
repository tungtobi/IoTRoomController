import React, { Component } from "react";

class MenuItem extends Component {
  state = {
    link: this.props.item.link,
    src: this.props.item.src,
    icon: this.props.item.icon,
    nameItem: this.props.item.nameItem,
    changeWindow: this.props.changeWindow
  };
  render() {
    return (
      <button
        onClick={() => this.state.changeWindow(this.state.nameItem)}
        type="button"
        className="btn btn-primary btn-lg btn-block"
      >
        <span className="float-left">
          <i className={this.state.icon}></i>
          <a className="px-xl-2">{this.state.nameItem}</a>
        </span>
      </button>
    );
  }
}

export default MenuItem;
