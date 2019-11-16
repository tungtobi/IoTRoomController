import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";

class AccountEditorForm extends Component {
  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    return (
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="username" disabled />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Device Name</Form.Label>
          <Form.Control type="password" placeholder="password" required />
        </Form.Group>
        <Form.Group controlId="cf-password">
          <Form.Label>Device Name</Form.Label>
          <Form.Control
            type="cf-password"
            placeholder="confirm password"
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" placeholder="description..." required />
        </Form.Group>
        <Form.Group controlId="devices">
          <Form.Label>Devices</Form.Label>
          <Select isMulti name="devices" options={options} />
        </Form.Group>
      </Form>
    );
  }
}

export default AccountEditorForm;
