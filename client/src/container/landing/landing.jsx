import React from "react";

import Home from "./home/home";
import Exam from "./exam/exam";
import Feature from "./feature/feature";
import Demo from "./demo/demo";
import Clients from "./clients/clients";
import Contact from "./contact/contact";

import "../../assets/scss/style.scss";

const landing = props => {
  return (
    <div className={"__landing__upper"}>
      <Home />
      <Exam />
      <Feature />
      <Demo />
      <Clients />
      <Contact />
    </div>
  );
};

export default landing;
