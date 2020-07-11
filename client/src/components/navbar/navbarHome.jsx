import React from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import Scrollspy from "react-scrollspy";
import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";
import { Route, Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
//import Spinner from "react-bootstrap/Spinner";
//import "./navbarLanding.css";

const navbarHome = (props) => {
  const items = ["home", "exam", "feature", "demo", "clients", "contact"];
  const pages = props.isAuthenticated
    ? ["dashboard", "logout"]
    : ["signup", "login"];

  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="md">
      {/* {props.auth.loading && (
        <Spinner
          animation="border"
          role="status"
          variant="light"
          className="mr-2"
        ></Spinner>
      )} */}
      <Link to="/" className="navbar-brand">
        React-Bootstrap
      </Link>
      <Navbar.Toggle aria-controls="navbarResponsive" />
      <Navbar.Collapse id="navbarResponsive">
        <Nav className="ml-auto">
          {/* <Scrollspy
          items={items}
          currentClassName={"active"}
          className="navbar-nav ml-auto"
          offset={-80}
        > */}
          {items.map((value) => (
            <Nav.Item key={value} as="li" className="mr-3">
              {props.isLanding ? (
                <LinkScroll
                  activeClass="active"
                  to={value}
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  // //onSetActive={this.handleSetActive}
                  href={"/"}
                  className="nav-link"
                  //to={{ pathname: "/" }}
                >
                  {value}
                </LinkScroll>
              ) : (
                <HashLink
                  to={"/#" + value}
                  className="nav-link"
                  activeClassName="active"
                >
                  {value}
                </HashLink>
              )}
            </Nav.Item>
          ))}
          {pages.map((value) => (
            <Nav.Item key={value} as="li" className="mr-3">
              <NavLink
                // href={"/" + value}
                to={{ pathname: "/" + value }}
                className="nav-link"
              >
                {value}
              </NavLink>
            </Nav.Item>
          ))}
          {/* </Scrollspy> */}
        </Nav>
      </Navbar.Collapse>
      {props.isLanding ? (
        <div className="scrollToTop" onClick={() => scroll.scrollToTop()}>
          <FontAwesomeIcon icon={"arrow-up"} size="3x" transform="shrink-4" />
        </div>
      ) : null}
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(navbarHome);
