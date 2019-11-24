import React, { Component } from "react";
import DevicesTable from "../DevicesTable";
import ScenarioesTable from "../ScenarioesTable";
import { Card, Button } from "react-bootstrap";
import "./style.css";

class Devices extends Component {
  render() {
    return (
      <div className="p-4 devices">
        <Card>
          <Card.Title>Devices Manager</Card.Title>
          <Card.Body>
            <DevicesTable
              devicesList={this.props.devicesList}
              removeDevice={this.props.removeDeviceList}
            />
          </Card.Body>
          <Card.Footer className="hide-border mb-2 mt-n4">
            <Button
              variant="primary float-right"
              onClick={this.props.showDevAddModal}
            >
              <i className="fas fa-plus" /> Add new device
            </Button>
            <Button variant="light gray-outline float-right mr-2">
              <i className="fas fa-plus" /> Nothing
            </Button>
          </Card.Footer>
        </Card>
        <Card className="mt-4">
          <Card.Title>Devices Scenario</Card.Title>
          <Card.Body>
            <ScenarioesTable
              devicesScenario={this.props.devicesScenario}
              removeDevice={this.props.removeDeviceScenario}
            />
          </Card.Body>
          <Card.Footer className="hide-border mb-2 mt-n4">
            <Button variant="primary float-right">
              <i className="fas fa-plus" /> Add new scenario
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default Devices;
