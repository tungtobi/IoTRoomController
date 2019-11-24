import React, { Component } from "react";
import HistoryTable from "../HistoryTable";
import { Card } from "react-bootstrap";

class History extends Component {
  render() {
    return (
      <div className="p-4 devices">
        {this.props.devicesHistory.map((item, idx) => (
          <Card key={idx} className="mb-4">
            <Card.Title>{item.date}</Card.Title>
            <Card.Body>
              <HistoryTable
                histories={item.histories}
                removeDevice={this.props.removeDeviceHistory}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default History;
