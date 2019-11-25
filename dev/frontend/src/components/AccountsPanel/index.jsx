import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

class AccountsPanel extends Component {
  render() {
    return (
      <Card>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created Date</th>
              <th scope="col">Status</th>
              <th scope="col">Devices</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.accounts.map(item => (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.createdDate}</td>
                <td>{item.status}</td>
                <td>{item.devices}</td>
                <td className="p-0">
                  <button
                    onClick={() => this.props.showDevEditModal()}
                    type="button"
                    className="btn btn-link"
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    onClick={() => this.props.removeDevice(item.seria)}
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
                <Button
                  onClick={() => this.props.showDevAddModal()}
                  variant="primary"
                  className="mt-3 float-right"
                >
                  Add new device
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>
    );
  }
}

export default AccountsPanel;
