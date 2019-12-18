import CenteredModal from "../CenteredModal/index";
import React from "react";
import { Button, ButtonToolbar } from "react-bootstrap";
import DeviceEditorForm from "./form";

class DeviceEditorModal extends CenteredModal {
  getTitle() {
    return "Edit a device";
  }

  getBody() {
    return <DeviceEditorForm />;
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

export default DeviceEditorModal;
