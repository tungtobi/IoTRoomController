import React, { Component } from "react";
import IndexCard from "../IndexCard";

class IndexesPanel extends Component {
  state = {
    notification_time_update: "Update now"
  };

  change_notification_time_update = text => {
    this.setState({ notification_time_update: text });
  };

  render() {
    return (
      <div className="panel mb-4">
        {this.props.indexes.map((item, idx) => (
          <IndexCard
            key={idx}
            index={item}
            notification_time_update={this.state.notification_time_update}
            timeUpdate={this.props.timeUpdate}
            handUpdateData={this.props.handUpdateData}
            change_notification_time_update={
              this.change_notification_time_update
            }
          ></IndexCard>
        ))}
      </div>
    );
  }
}

export default IndexesPanel;
