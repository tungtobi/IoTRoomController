import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

class DevicesScenario extends Component {
  state = {};
  render() {
    return (
      <Card>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Device Name</th>
              <th scope="col">Seria Number</th>
              <th scope="col">Operator</th>
              <th scope="col">Time</th>
              <th scope="col">Note</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.devicesScenario.map(item => (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.seria}</td>
                <td>{item.operator}</td>
                <td>{item.time}</td>
                <td>{item.note}</td>
                <td className="p-0">
                  <button type="button" className="btn btn-link">
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    onClick={() => this.props.removeDevice(item.code)}
                    style={{ color: "Tomato" }}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7">
                <Button variant="primary" className="mt-3 float-right">
                  Add new Scenario
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>
    );
  }
}

export default DevicesScenario;
