import React from "react";
import { FaBox } from "react-icons/fa";

const IconBar = ({ styles }) => {
  return (
    <>
      <div style={styles}>
        <div className="p-1 my-1">
          <FaBox size="2em" />
        </div>
        <div className="p-1 my-1">
          <FaBox size="2em" />
        </div>
        <div className="p-1 my-1">
          <FaBox size="2em" />
        </div>
        <div className="p-1 my-1">
          <FaBox size="2em" />
        </div>
        <div className="p-1 my-1">
          <FaBox size="2em" />
        </div>
      </div>
    </>
  );
};

export default IconBar;
