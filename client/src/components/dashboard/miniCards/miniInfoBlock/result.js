import React from "react";

import MiniBlock from "./miniBlock";

const result = ({ value, footerValue }) => {
  return (
    <MiniBlock
      heading={"Overall Score"}
      //
      value={value}
      //
      faIcon={"poll"}
      footerHeading={"Out of"}
      footerValue={footerValue}
      color={"dark"}
      faFooterIcon={"balance-scale"}
    />
  );
};

export default result;
