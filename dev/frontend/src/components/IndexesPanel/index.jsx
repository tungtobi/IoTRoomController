import React, { Component } from "react";
import IndexCard from "../IndexCard";

class IndexesPanel extends Component {
  state = {
    notify: "Update now"
  };

  changeNotify = text => {
    this.setState({ notify: text });
  };

  render() {
    return (
      <div className="panel mb-4">
        {this.props.indexes.map((item, idx) => (
          <IndexCard
            key={idx}
            index={item}
            notify={this.state.notify}
            timeUpdate={this.props.timeUpdate}
            handUpdateData={this.props.handUpdateData}
            changeNotify={this.changeNotify}
          />
        ))}
      </div>
    );
  }
}

export default IndexesPanel;
