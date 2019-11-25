import React, { Component } from "react";
import Navbar from "../Navbar";
import Leftbar from "../Leftbar";
import RenderWindow from "../RenderWindow";
import DeviceAdditionModal from "../DeviceAdditionModal";
import DeviceEditorModal from "../DeviceEditorModal";
import AccountEditorModal from "../AccountEditorModal";
import AccountAdditionModal from "../AccountAdditionModal";
import "./index.css";
import CenteredAlert from "../CenteredAlert";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeUpdate: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      alert: {
        userUnavailable: false
      },
      modal: {
        showDeviceEditor: false,
        showDeviceAddition: false,
        showScenarioEditor: false,
        showScenarioAddition: false
      },
      menuItems: [
        {
          link: "/dashboard",
          icon: "fas fa-chart-line",
          nameItem: "Room Status"
        },
        {
          link: "/dashboard/forecasts",
          icon: "fas fa-cloud-sun",
          nameItem: "Forecasts"
        },
        {
          link: "/dashboard/history",
          icon: "fas fa-history",
          nameItem: "History"
        },
        {
          link: "#",
          icon: "fas fa-user-circle",
          nameItem: "Account"
        }
      ],
      avatar: {
        src:
          "https://yt3.ggpht.com/a/AGF-l7-rOqnsoRaW8LTM75Y2vuElIySnOe18OPUNnA=s900-c-k-c0xffffffff-no-rj-mo",
        name: "Nguyen Viet Linh"
      },
      devicesList: [
        {
          id: "1",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Active",
          accounts: ["Dad", "Mom"]
        },
        {
          id: "2",
          name: "Projector Test",
          seria: "C03TD0QJHV4",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Active",
          accounts: ["Dad", "Mom", "Bro"]
        },
        {
          id: "3",
          name: "Projector Test",
          seria: "C03TD0QJHV5",
          createdDate: "16/10/2019 - 07:00 am",
          status: "Deactive",
          accounts: ["Dad", "Mom"]
        }
      ],
      devicesScenario: [
        {
          code: "123",
          id: "1",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          operator: "Turn on",
          time: "04:00 pm",
          note: "...."
        },
        {
          code: "234",
          id: "2",
          name: "Air Conditioner Test",
          seria: "C02TD0QGFVH3",
          operator: "Turn off",
          time: "07:00 am",
          note: "...."
        }
      ],
      devicesHistory: [
        {
          date: "Yesterday",
          histories: [
            {
              id: "1",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn on",
              time: "04:00 pm",
              note: "...."
            },
            {
              id: "2",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn off",
              time: "07:00 am",
              note: "...."
            }
          ]
        },
        {
          date: "Futherday",
          histories: [
            {
              id: "1",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn on",
              time: "05:00 pm",
              note: "...."
            },
            {
              id: "2",
              name: "Air Conditioner Test",
              seria: "C02TD0QGFVH3",
              operator: "Turn off",
              time: "07:00 am",
              note: "...."
            }
          ]
        }
      ],
      roomStatusData: {
        Temperature: {
          title: "Temperature",
          options: {
            legend: {
              float: false,
              position: "bottom", // whether to position legends in 1 of 4
              // direction - top, bottom, left, right
              horizontalAlign: "center", // when position top/bottom, you can
              // specify whether to align legends
              // left, right or center
              verticalAlign: "middle"
            },
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          series: [
            {
              name: "Temperature",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        Humidity: {
          title: "Humidity",
          options: {
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          series: [
            {
              name: "Humidity",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        },
        AQI: {
          title: "AQI",
          options: {
            xaxis: {
              categories: [
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
              ]
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          series: [
            {
              name: "AQI",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
          ]
        }
      },
      indexes: [
        {
          title: "AQI",
          index: "99 PM2.5",
          icon: "fas fa-wind item-icon-green p-3"
        },
        {
          title: "Humidity",
          index: "30 %",
          icon: "fas fa-tint item-icon-blue p-3"
        },
        {
          title: "Temperature",
          index: "29 °C",
          icon: "fas fa-temperature-low item-icon-orange p-3"
        }
      ],
      data: [
        { Date: "2019-11-25 04:12:00", AQI: 92, Humidity: 74, Temperature: 28 },
        { Date: "2019-11-25 04:13:00", AQI: 92, Humidity: 77, Temperature: 28 },
        { Date: "2019-11-25 04:14:00", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:15:00", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:16:00", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:17:01", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:18:01", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:19:01", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:20:01", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:21:01", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:22:01", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:23:01", AQI: 92, Humidity: 75, Temperature: 28 },
        { Date: "2019-11-25 04:24:01", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:25:02", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:26:02", AQI: 92, Humidity: 76, Temperature: 28 },
        { Date: "2019-11-25 04:27:02", AQI: 92, Humidity: 77, Temperature: 28 },
        { Date: "2019-11-25 04:28:02", AQI: 92, Humidity: 77, Temperature: 28 },
        { Date: "2019-11-25 04:29:02", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:30:02", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:31:02", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:32:02", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:33:02", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:34:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:35:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:36:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:37:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:38:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:39:03", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:40:03", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:41:03", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:42:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:43:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:44:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:45:04", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:46:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:47:04", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 04:48:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:49:04", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:50:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:51:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:52:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:53:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:54:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:55:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:56:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:57:05", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:58:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 04:59:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:00:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:01:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:02:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:03:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:04:06", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:05:57", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:06:57", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 05:07:57", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 05:08:57", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:09:57", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:10:57", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:11:58", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 05:12:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:13:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:14:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:15:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:16:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:17:58", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:18:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:19:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:20:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:21:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:22:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:23:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2036-02-07 13:28:16", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:25:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:26:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:27:59", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:29:00", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:30:00", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:31:00", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:32:00", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:33:00", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:34:00", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:35:00", AQI: 92, Humidity: 78, Temperature: 27 },
        { Date: "2019-11-25 05:36:00", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:37:00", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:38:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:39:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:40:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:41:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:42:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:43:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:44:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:45:01", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:46:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:47:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:48:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:49:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:50:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:51:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:52:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:53:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:54:02", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:55:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:56:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:57:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:58:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 05:59:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:00:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:01:03", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:02:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:03:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:04:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:05:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:06:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:07:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:08:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:09:04", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:10:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:11:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:12:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:13:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:14:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:15:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:16:05", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:17:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:18:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:19:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:20:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:21:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:22:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:23:06", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:24:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:25:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:26:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:27:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:28:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:29:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:30:07", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:31:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:32:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:33:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:34:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:35:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:36:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:37:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:38:08", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:39:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:40:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:41:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:42:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:43:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:44:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:45:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:46:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:47:09", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:48:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:49:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:50:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:51:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:52:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:53:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:54:10", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:55:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:56:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:57:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:58:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 06:59:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:00:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:01:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:02:11", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:03:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:04:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:05:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:06:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:07:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:08:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:09:12", AQI: 92, Humidity: 80, Temperature: 27 },
        { Date: "2019-11-25 07:10:12", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:11:13", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:12:13", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:13:13", AQI: 92, Humidity: 79, Temperature: 27 },
        { Date: "2019-11-25 07:14:13", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:15:13", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:16:13", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:17:13", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:18:14", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:19:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:20:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:21:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:22:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:23:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:24:14", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:25:14", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:26:15", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:27:15", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:28:15", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:29:15", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:30:15", AQI: 92, Humidity: 77, Temperature: 27 },
        { Date: "2019-11-25 07:31:15", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2036-02-07 13:28:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:33:15", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:34:15", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:35:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:36:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:37:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:38:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:39:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:40:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:41:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:42:16", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 07:43:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:44:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:45:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:46:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:47:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:48:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:49:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:50:17", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:51:18", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:52:18", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 07:53:18", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 07:54:19", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 07:55:19", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 07:56:19", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:57:19", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:58:19", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 07:59:20", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:00:20", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:01:20", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:02:20", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:03:20", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:04:20", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:05:20", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:06:20", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:07:20", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:08:21", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2036-02-07 13:28:16", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:10:21", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:11:21", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:12:21", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:13:21", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:14:21", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:15:21", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:16:21", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:17:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:18:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:19:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:20:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:21:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:22:22", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:23:22", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:24:23", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:25:23", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:26:23", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:27:23", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:28:23", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:29:23", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:30:23", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:31:23", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:32:23", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:33:24", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:34:24", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:35:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:36:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:37:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:38:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:39:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:40:24", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:41:25", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:42:25", AQI: 92, Humidity: 76, Temperature: 27 },
        { Date: "2019-11-25 08:43:25", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:44:25", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:45:25", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:46:25", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:47:26", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:48:26", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:49:26", AQI: 92, Humidity: 75, Temperature: 27 },
        { Date: "2019-11-25 08:50:26", AQI: 92, Humidity: 74, Temperature: 27 },
        { Date: "2019-11-25 08:51:27", AQI: 92, Humidity: 74, Temperature: 27 }
      ]
    };
    this.handUpdateData = this.handUpdateData.bind(this);
    this.changeValue = this.changeValue.bind(this);

    this.showDevEditModal = this.showDevEditModal.bind(this);
    this.hideDevEditModal = this.hideDevEditModal.bind(this);

    this.showDevAddModal = this.showDevAddModal.bind(this);
    this.hideDevAddModal = this.hideDevAddModal.bind(this);

    this.showUserUnavailableAlert = this.showUserUnavailableAlert.bind(this);
    this.hideUserUnavailableAlert = this.hideUserUnavailableAlert.bind(this);
  }

  handUpdateData() {
    var currentSeconds = new Date().getSeconds(); //Current Seconds
    var currentMinutes = new Date().getMinutes(); //Current Minutes
    var currentHours = new Date().getHours(); //Current Hours
    this.setState({
      timeUpdate: {
        seconds: currentSeconds,
        minutes: currentMinutes,
        hours: currentHours
      }
    });

    this.fetchData();
    this.changeValue();
  }

  changeValue() {
    var lengthData = this.state.data.length - 1;
    var num_xaxis = Math.floor(lengthData / 60);
    var indexes2Chart = {
      AQI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Humidity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Temperature: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };

    var series_AQI = [
      {
        name: "AQI",
        data: indexes2Chart.AQI
      }
    ];

    var series_Humidity = [
      {
        name: "Humidity",
        data: indexes2Chart.Humidity
      }
    ];

    var series_Temperature = [
      {
        name: "Temperature",
        data: indexes2Chart.Temperature
      }
    ];

    var i;
    var index_array = 9;
    for (i = num_xaxis - 1; i >= 0; i--) {
      indexes2Chart.AQI[index_array] = this.state.data[i * 60].AQI;
      indexes2Chart.Humidity[index_array] = this.state.data[i * 60].Humidity;
      indexes2Chart.Temperature[index_array] = this.state.data[
        i * 60
      ].Temperature;
      index_array--;
    }

    var now_AQI = this.state.data[lengthData - 1].AQI;
    var now_Humidity = this.state.data[lengthData - 1].Humidity;
    var now_Temperature = this.state.data[lengthData - 1].Temperature;

    var now_index_AQI = now_AQI.toString() + " PM2.5";
    var now_index_Humidity = now_Humidity.toString() + " %";
    var now_index_Temperature = now_Temperature.toString() + " °C";

    var now_indexes = [
      {
        title: "AQI",
        index: "99 PM2.5",
        icon: "fas fa-wind item-icon-green p-3"
      },
      {
        title: "Humidity",
        index: "30 %",
        icon: "fas fa-tint item-icon-blue p-3"
      },
      {
        title: "Temperature",
        index: "29 °C",
        icon: "fas fa-temperature-low item-icon-orange p-3"
      }
    ];

    this.setState({
      indexes: now_indexes,
      roomStatusData: {
        ...this.state.roomStatusData,
        AQI: {
          ...this.state.roomStatusData.AQI,
          series: series_AQI
        },
        Humidity: {
          ...this.state.roomStatusData.Humidity,
          series: series_Humidity
        },
        Temperature: {
          ...this.state.roomStatusData.Temperature,
          series: series_Temperature
        }
      }
    });
    console.log(this.state.roomStatusData.AQI.series[0].data);
  }

  fetchData() {
    fetch(`http://ec2-54-237-117-36.compute-1.amazonaws.com/SensorData`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data
        });
        console.log(this.state.indexes);
      })
      .catch(console.log);
  }

  showUserUnavailableAlert() {
    this.setState({
      alert: {
        userUnavailable: true
      }
    });
  }

  hideUserUnavailableAlert() {
    this.setState({
      alert: {
        userUnavailable: false
      }
    });
  }

  componentDidMount() {
    this.getCurrentWindow();
  }

  getCurrentWindow() {
    const path = window.location.href;
    const selected = [...this.state.menuItems]
      .reverse()
      .find(item => path.includes(item.link));

    this.setState({
      nameWindow: selected.nameItem
    });
  }

  showDevEditModal() {
    this.setState({ modal: { showDeviceEditor: true } });
  }

  hideDevEditModal() {
    this.setState({ modal: { showDeviceEditor: false } });
  }

  showDevAddModal() {
    this.setState({ modal: { showDeviceAddition: true } });
  }

  hideDevAddModal() {
    this.setState({ modal: { showDeviceAddition: false } });
  }

  removeDeviceList = seria => {
    const devicesList = this.state.devicesList.filter(d => d.seria !== seria);
    this.setState({ devicesList });
  };

  removeDeviceScenario = code => {
    const devicesScenario = this.state.devicesScenario.filter(
      d => d.code !== code
    );
    this.setState({ devicesScenario });
  };

  removeDeviceHistory = seria => {};

  changeDevice = seria => {};

  changeWindow = nameWindow => {
    if (nameWindow === "Account") {
      this.showUserUnavailableAlert();
    } else {
      this.setState({
        nameWindow: nameWindow
      });
    }
  };

  render() {
    return (
      <div className="background-light">
        {/* Device Editor modal */}
        <DeviceEditorModal
          show={this.state.modal.showDeviceEditor}
          onHide={this.hideDevEditModal}
        ></DeviceEditorModal>
        <DeviceAdditionModal
          show={this.state.modal.showDeviceAddition}
          onHide={this.hideDevAddModal}
        ></DeviceAdditionModal>
        <CenteredAlert
          title="Tính năng chưa được hỗ trợ"
          btnName="Ok"
          show={this.state.alert.userUnavailable}
          onHide={this.hideUserUnavailableAlert}
          onSubmit={this.hideUserUnavailableAlert}
        >
          Xin lỗi bạn{" "}
          <span>
            <i className="far fa-sad-cry"></i>
          </span>{" "}
          tính năng quản lý người dùng chưa được hỗ trợ trong phiên bản này!
        </CenteredAlert>

        {/* Device addition Modal */}
        <DeviceAdditionModal
          show={this.state.isShowDevAddModal}
          onHide={this.hideDevAddModal}
        ></DeviceAdditionModal>

        {/* Account addition modal */}
        <AccountAdditionModal
          show={this.state.isShowAccAddModal}
          onHide={this.hideAccAddModal}
        ></AccountAdditionModal>

        {/* Account Editor modal */}
        <AccountEditorModal
          show={this.state.isShowAccEditModal}
          onHide={this.hideAccEditModal}
        ></AccountEditorModal>

        <div className="menu-horizontal">
          <Leftbar
            selected={this.state.nameWindow}
            menuItems={this.state.menuItems}
            avatar={this.state.avatar}
            changeWindow={this.changeWindow}
          />
        </div>
        <div className="dashboard-content">
          <Navbar nameWindow={this.state.nameWindow}></Navbar>
          <RenderWindow
            timeUpdate={this.state.timeUpdate}
            nameWindow={this.state.nameWindow}
            devicesList={this.state.devicesList}
            devicesScenario={this.state.devicesScenario}
            devicesHistory={this.state.devicesHistory}
            roomStatusLabels={this.state.roomStatusLabels}
            roomStatusData={this.state.roomStatusData}
            indexes={this.state.indexes}
            accounts={this.state.accounts}
            removeDeviceList={this.removeDeviceList}
            removeDeviceScenario={this.removeDeviceScenario}
            removeDeviceHistory={this.removeDeviceHistory}
            showDevEditModal={this.showDevEditModal}
            showDevAddModal={this.showDevAddModal}
            handUpdateData={this.handUpdateData}
          ></RenderWindow>
        </div>
      </div>
    );
  }
}

export default Header;
