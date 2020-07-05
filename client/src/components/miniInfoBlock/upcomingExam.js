import React from "react";

import MiniBlock from "../miniBlock";

const upcomingExam = ({ value, footerValue }) => {
  return (
    <MiniBlock
      heading={"Upcoming Exam"}
      //
      value={value}
      //
      faIcon={"file"}
      footerHeading={"Start On"}
      footerValue={footerValue}
      color={"success"}
      faFooterIcon={"clock"}
    />
  );
};

export default upcomingExam;
