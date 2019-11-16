import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import handeInput from "../../validation";

class DeviceAdditionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameValid: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    const valid = handeInput(name, value);
    this.setState({
      nameValid: valid
    });

    console.log(this.state.nameValid);
  }

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
          <Form.Control type="text" placeholder="serial number" required />
        </Form.Group>
        <Form.Group controlId="deviceName">
          <Form.Label>Device Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="device name"
            name="name"
            onChange={this.handleChange}
            isInvalid={!this.state.nameValid}
          />
          <Form.Control.Feedback type="invalid">
            Tên đăng nhập có độ dài 3-30 ký tự và không được chứa các ký tự đặc
            biệt
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="accounts">
          <Form.Label>Accounts</Form.Label>
          <Select isMulti name="accounts" options={options} />
        </Form.Group>
      </Form>
    );
  }
}

export default DeviceAdditionForm;
