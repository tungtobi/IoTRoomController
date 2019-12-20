import React, { Component } from "react";
import IndexCard from "../IndexCard";

class IndexesPanel extends Component {
  state = {
    notify: "Update now",
    indexes: [
      {
        title: "AQI",
        index: "-- PM2.5",
        icon: "fas fa-wind item-icon-green p-3"
      },
      {
        title: "Humidity",
        index: "-- %",
        icon: "fas fa-tint item-icon-blue p-3"
      },
      {
        title: "Temperature",
        index: "-- °C",
        icon: "fas fa-temperature-low item-icon-orange p-3"
      }
    ]
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.data) return null;

    const { data } = props;

    const lengthData = data.length;

    if (lengthData === 0) return null;

    const nowAQI = data[lengthData - 1].AQI;
    const nowHumidity = data[lengthData - 1].Humidity;
    const nowTemperature = data[lengthData - 1].Temperature;

    let indexes = state.indexes;

    indexes[0].index = nowAQI + " PM2.5";
    indexes[1].index = nowHumidity + " %";
    indexes[2].index = nowTemperature + " °C";

    return { indexes };
  }

  changeNotify = text => {
    this.setState({ notify: text });
  };

  render() {
    return (
      <div className="panel mb-4">
        {this.state.indexes.map((item, idx) => (
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
