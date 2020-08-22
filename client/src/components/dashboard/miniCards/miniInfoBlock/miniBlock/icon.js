import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { icon } from "@fortawesome/fontawesome-svg-core";

const icon = ({ icon, size, classes }) => (
  <FontAwesomeIcon icon={icon} size={size} className={classes} />
);
export default icon;
