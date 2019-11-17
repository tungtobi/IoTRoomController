import React, { Component } from "react";
import "./index.css";
class Avatar extends Component {
  state = {
    src: this.props.avatar.src,
    name: this.props.avatar.name
  };
  render() {
    return (
      <div className="avatar">
        <div>
          <img
            src={this.state.src}
            alt={this.state.name}
            className="avatar-img rounded-circle float-left"
          ></img>
        </div>
      </div>
    );
  }
}

export default Avatar;
