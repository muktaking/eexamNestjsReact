import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchForm from "../form/search/searchForm";
import { logoutLoader } from "../../store/auth";
import { Redirect } from "react-router";

const topbar = (props) => {
  const classes = {
    formControl: "search-input",
    searchBtn: "search-button",
  };

  return (
    <Col className="bg-dark py-2 top-navbar">
      <Row className="align-items-center">
        <Col md={4}>
          <h4 className="text-light text-uppercase mb-0">{props.pageName}</h4>
        </Col>
        <Col md={5}>
          <SearchForm
            formControl={classes.formControl}
            searchBtn={classes.searchBtn}
          />
        </Col>
        <Col md={3}>
          <Nav>
            <Nav.Item className="icon-parent">
              <Nav.Link className="icon-bullet">
                <FontAwesomeIcon
                  icon="comments"
                  size="lg"
                  className="text-muted"
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="icon-parent">
              <Nav.Link className="icon-bullet">
                <FontAwesomeIcon icon="bell" size="lg" className="text-muted" />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              className="ml-md-auto"
              // onClick={() => {
              //   props.onlogoutLoader();
              //   props.history.push({ pathname: "/" });
              // }}
            >
              <NavLink
                // href={"/" + value}
                to={{ pathname: "/logout" }}
                className="nav-link"
              >
                <FontAwesomeIcon
                  icon="sign-out-alt"
                  size="lg"
                  className="text-danger"
                />
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Col>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onlogoutLoader: () => dispatch(logoutLoader()),
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

//export default connect(null, n)(withRouter(topbar));
export default topbar;
