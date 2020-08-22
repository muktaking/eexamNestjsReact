import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  monthShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  state = {
    data: {
      labels: this.month,
      datasets: [
        {
          label: "Marks in Percentage", // Name the series
          data: [45, 20, 10, 67, 50, 60, 70, 68, 90, 20], // Specify the data values array
          fill: false,
          borderColor: "#2196f3", // Add custom color border (Line)
          backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width
        }
      ]
    },
    options: {
      responsive: true // Instruct chart js to respond nicely.
    }
  };
  render() {
    return <Line data={this.state.data} options={this.options} />;
  }
}

export default LineChart;
