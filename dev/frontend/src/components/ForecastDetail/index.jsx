import React, { Component } from "react";
import { Table, Image } from "react-bootstrap";

class ForecastDetail extends Component {
  render() {
    const convertToCDegree = ktemp => {
      return Math.round(ktemp - 273) + "°";
    };

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>
              <i className="far fa-clock"></i> Time
            </th>
            <th>
              <i className="fas fa-cloud-sun"></i> Weather
            </th>
            <th>
              <i className="fas fa-temperature-low"></i> Temperature
            </th>
            <th>
              <i className="fas fa-tint"></i> Humidity
            </th>
            <th>
              <i className="fas fa-water"></i> Pressure
            </th>
            <th>
              <i className="fas fa-wind"></i> Wind
            </th>
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
    );
  }
}

export default ForecastDetail;
