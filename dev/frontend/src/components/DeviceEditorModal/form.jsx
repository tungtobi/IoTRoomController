import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

class DeviceEditorForm extends Component {
  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    return (
      <Form>
        <Form.Group controlId="serialNumber">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control type="text" placeholder="serial number" disabled />
        </Form.Group>
        <Form.Group controlId="deviceName">
          <Form.Label>Device Name</Form.Label>
          <Form.Control type="text" placeholder="device name" required />
        </Form.Group>
        <Form.Group controlId="accounts">
          <Form.Label>Accounts</Form.Label>
          <Select isMulti name="accounts" options={options} />
        </Form.Group>
      </Form>
    );
  }
}

export default DeviceEditorForm;
