import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Route } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/topbar";

//importing routing parts
import Dashboard from "./dashboard";
import Category from "./category";
import Question from "./question";
import Exam from "./exam";
import "../../assets/scss/section/dashboard.scss";

const innerContent = (props) => {
  const pageName = props.match.url.split("/", 2)[1];
  return (
    <Navbar expand="md" variant="light" className="dashboard py-0">
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="ml-auto mb-2 bg-light"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Container fluid="true">
          <Row>
            <Col xl={2} lg={3} md={4} className="sidebar">
              <Sidebar />
            </Col>

            <Col xl={10} lg={9} md={8}>
              <Row>
                <Topbar pageName={pageName} />
              </Row>
              {
                <>
                  <Route path="/dashboard" exact component={Dashboard} />
                  <Route path="/category" exact component={Category} />
                  <Route path="/question" exact component={Question} />
                  <Route path="/exam" exact component={Exam} />
                </>
              }
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default innerContent;
