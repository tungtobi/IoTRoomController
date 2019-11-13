import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";

class ScenarioAdditionForm extends Component {
  render() {
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" }
    ];
    return (
      <Form>
        <Form.Group controlId="serialNumber">
          <Form.Label>Device Name</Form.Label>
          <Select name="names" options={options} />
        </Form.Group>
        <Form.Group controlId="deviceName">
          <Form.Label>Operator</Form.Label>
          <Select name="colors" options={options} />
        </Form.Group>
        <Form.Group controlId="time">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" placeholder="00:00" required />
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" placeholder="note..." required />
        </Form.Group>
      </Form>
    );
  }
}

export default ScenarioAdditionForm;
