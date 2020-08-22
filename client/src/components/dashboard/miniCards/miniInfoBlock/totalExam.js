import React from "react";

import MiniBlock from "./miniBlock";

const totalExam = ({ value, footerValue }) => {
  return (
    <MiniBlock
      heading={"Total Exams"}
      value={value}
      faIcon={"file-alt"}
      footerHeading={"Exam Taken"}
      footerValue={footerValue}
      color={"info"}
      faFooterIcon={"file-import"}
    />
  );
};

export default totalExam;
