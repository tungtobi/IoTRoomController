import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

import ChartsPanel from "../ChartsPanel";
import IndexesPanel from "../IndexesPanel";

import "./index.css";

class RoomStatus extends Component {
  render() {
    if (this.props.timeUpdate.hours === -2) {
      return (
        <div className="p-4">
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Check your connection and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit. Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Alert>
        </div>
      );
    } else {
      return (
        <div className="p-4">
          <IndexesPanel
            timeUpdate={this.props.timeUpdate}
            indexes={this.props.indexes}
            handUpdateData={this.props.handUpdateData}
          />
          <ChartsPanel roomStatusData={this.props.roomStatusData} />
        </div>
      );
    }
  }
}

export default RoomStatus;
