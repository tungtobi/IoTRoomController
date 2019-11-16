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
        <Button
          onClick={this.props.onHide}
          variant="light"
          style={{ border: "1px solid #c6c6c6", marginInlineEnd: "8px" }}
        >
          Close
        </Button>
        <Button onClick={this.props.onSummit}>Save changes</Button>
      </ButtonToolbar>
    );
  }
}

export default DeviceAdditionModal;
