import React, { Component } from "react";
import { Form, Table } from "react-bootstrap";

class DevicesTable extends Component {
  render() {
    return (
      <Table responsive hover striped>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Device Name</th>
            <th scope="col">Seria Number</th>
            <th scope="col">Created Date</th>
            <th scope="col">Status</th>
            <th scope="col">Accounts</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.devicesList.map((item, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.seria}</td>
              <td>{item.createdDate}</td>
              <td>
                <Form>
                  <Form.Switch
                    defaultChecked={item.status === "Active" ? true : false}
                    label={item.status}
                  />
                </Form>
              </td>
              <td>{item.accounts}</td>
              <td className="p-0">
                <button type="button" className="btn btn-link">
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
      </Table>
    );
  }
}

export default DevicesTable;
