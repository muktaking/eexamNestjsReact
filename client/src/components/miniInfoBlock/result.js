import React from "react";

import MiniBlock from "../miniBlock";

const result = ({ value, footerValue }) => {
  return (
    <MiniBlock
      heading={"Exam Result"}
      //
      value={value + " %"}
      //
      faIcon={"poll"}
      footerHeading={"Overal Score"}
      footerValue={footerValue + " %"}
      color={"dark"}
      faFooterIcon={"balance-scale"}
    />
  );
};

export default result;
