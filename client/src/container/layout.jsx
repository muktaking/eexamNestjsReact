import React, { useState } from "react";
import { Route } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "../components/sidebar/sidebar";
import SidebarMini from "../components/sidebar/sidebarMini";
import IconBar from "../components/sidebar/iconBar";
import Topbar from "../components/topbar/topbar";

//importing routing parts
import Dashboard from "./dashboard/dashboard";
import Category from "./category/category";
import Question from "./question/question";
import ExamPaper from "./examPaper/examPaper";
import ExamTaker from "./exams/examTaker";
import ExamTakerFree from "./exams/examTaker.free";
import ExamLists from "./exams/examLists";
import ExamListsFree from "./exams/examLists.free";
import Result from "./result/result";

import "../assets/scss/section/dashboard.scss";

const InnerContent = (props) => {
  const pageName = props.match.url.split("/", 2)[1];
  return (
    <>
      <Menu styles={styles}>
        <SidebarMini />
      </Menu>
      <Container fluid="true">
        <Row className="no-gutters">
          <Col xl={2} lg={3} md={4} className="sidebar">
            <Sidebar />
          </Col>

          <Col xl={10} lg={9} md={8}>
            <Row>
              <Col xs={12}>
                <Topbar pageName={pageName} />
              </Col>
              <Col className="ml-4">
                {
                  <>
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route path="/category" exact component={Category} />
                    <Route path="/question" exact component={Question} />
                    <Route path="/exampaper" exact component={ExamPaper} />
                    <Route path="/exams/:id" exact component={ExamTaker} />
                    <Route path="/exams" exact component={ExamLists} />
                    <Route path="/free" exact component={ExamListsFree} />
                    <Route path="/free/:id" exact component={ExamTakerFree} />
                    <Route path="/result" exact component={Result} />
                  </>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InnerContent;

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "30px",
    height: "25px",
    left: "28px",
    top: "10px",
    // @media (min-width: 767.98px) {
    //   display: none;
    // }
  },
  bmBurgerBars: {
    background: "#6655D9",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};
