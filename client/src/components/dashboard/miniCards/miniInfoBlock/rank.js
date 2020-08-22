import React from "react";

import MiniBlock from "./miniBlock";

const rank = ({ value, footerValue }) => {
  return (
    <MiniBlock
      heading={"Your Rank"}
      //
      value={value}
      //
      faIcon={"medal"}
      footerHeading={"Total students"}
      footerValue={footerValue}
      color={"warning"}
      faFooterIcon={"users"}
    />
  );
};

export default rank;
