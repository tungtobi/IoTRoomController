import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import DeviceAdditionForm from "./form";

class DeviceAdditionModal extends CenteredModal {
  getTitle() {
    return "Add a new device";
  }

  getBody() {
    return <DeviceAdditionForm />;
  }

  getFooter() {
    return (
      <ButtonToolbar>
        <Button onClick={this.props.onHide} variant="light">
          Close
        </Button>
        <Button onClick={this.props.onSubmit}>Save changes</Button>
      </ButtonToolbar>
    );
  }
}

export default DeviceAdditionModal;
