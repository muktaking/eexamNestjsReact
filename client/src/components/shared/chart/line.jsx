import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const options = {
      responsive: true, // Instruct chart js to respond nicely.
    };
    const data = {
      labels: ["start", ...this.props.labels, "end"],
      datasets: [
        {
          label: "Marks in Percentage", // Name the series
          data: [0, ...this.props.data, 100], // Specify the data values array
          fill: false,
          borderColor: "#2196f3", // Add custom color border (Line)
          backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
          borderWidth: 1, // Specify bar border width
        },
      ],
    };
    return <Line data={data} options={options} />;
  }
}

export default LineChart;
