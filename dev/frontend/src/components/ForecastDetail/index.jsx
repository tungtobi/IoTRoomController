import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";

class ForecastDetail extends Component {
  render() {
    const convertToCDegree = ktemp => {
      return Math.round(ktemp - 273) + "°";
    };

    return (
      <Table hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Weather</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Pressure</th>
            <th>Wind</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map((item, idx) => (
            <tr key={idx}>
              <td>{item.dt_txt.substring(10)}</td>
              <td>
                <Image
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                />
                <span> {item.weather[0].description}</span>
              </td>
              <td>{convertToCDegree(item.main.temp)}</td>
              <td>{item.main.humidity + "%"}</td>
              <td>{item.main.pressure}</td>
              <td>{item.wind.deg + "° " + item.wind.speed + "m/s"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      // <div>
      //   <div>
      //     <p>Nhiệt độ: {info ? info.main.temp : 0}</p>
      //     <p>Nhiệt độ tối thiểu: {info ? info.main.temp : 0}</p>
      //   </div>
      // </div>
    );
  }
}

export default ForecastDetail;
