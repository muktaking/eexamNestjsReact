import React from "react";
import * as _ from "lodash";
import { Bar } from "react-chartjs-2";
import BigCard from "../bigCard/bigCard";
import { useSelector } from "react-redux";

const ReportCard = (props) => {
  const userExamStat = useSelector((state) => state.dashboard.userExamStat);
  const examTitles = userExamStat
    ? _.map(userExamStat.examTitles, "title")
    : [];
  const mark = userExamStat
    ? _.map(
        userExamStat.stat,
        (value) => +((value.averageScore / value.totalMark) * 100).toFixed(2)
      )
    : [];
  //const stat = userExamStat ? _.map(userExamStat.stat, "averageScore") : [];

  console.log(mark);
  const options = {
    responsive: true, // Instruct chart js to respond nicely.
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
          },
        },
      ],
    },
  };
  const data = {
    labels: examTitles,
    datasets: [
      {
        label: "Marks in Percentage", // Name the series
        data: mark, // Specify the data values array
        fill: false,
        borderColor: "#2196f3", // Add custom color border (Line)
        backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
        borderWidth: 1, // Specify bar border width
        maxBarThickness: 35,
        barPercentage: 0.5,
      },
    ],
  };

  return (
    <BigCard header="User Reports" headerColor={"info"} showDatePicker={true}>
      <Bar data={data} options={options} />;
    </BigCard>
  );
};

export default ReportCard;
