import React from "react";
import Line from "../../../shared/chart/line";
import BigCard from "../bigCard/bigCard";

class ReportCard extends React.Component {
  render() {
    return (
      <BigCard header="User Reports" headerColor={"info"} showDatePicker={true}>
        <Line />
      </BigCard>
    );
  }
}

export default ReportCard;
