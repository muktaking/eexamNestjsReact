import React, { Component } from "react";
import { connect } from "react-redux";
import {
  FaHome,
  FaCog,
  FaQuestion,
  FaPen,
  FaBookOpen,
  FaBook,
  FaUser,
  FaTools,
} from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import avatorImg from "../../assets/image/admin.jpeg";

import setAuthorizationToken from "../../utils/setAuthorizationToken";
import { getUserLoader } from "../../store/user";
import { rolePermitted, canActivate } from "../../utils/canActivate";
import SearchForm from "../form/search/searchForm";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  classes = {
    sideNav: ["flex-column", "mt-2"].join(" "),
    sideNavLink: ["text-white", "p-1", "mb-2"].join(" "),
    fa: ["text-light", "fa-lg", "mr-3"].join(" "),
  };

  faIcons = [];
  menuName = [];
  navLinks = [];
  // state = {
  //   userName: [null]
  // };
  componentDidMount() {
    this.props.onGetUserLoader();
  }
  render() {
    const { userName, email, id, avatar } = this.props.user;
    if (canActivate(rolePermitted.student, this.props.token)) {
      this.faIcons = [
        <FaHome size="1.6em" className="mr-2" />,
        <FaBookOpen size="1.6em" className="mr-2" />,
        <FaUser size="1.6em" className="mr-2" />,
        <FaTools size="1.6em" className="mr-2" />,
      ];
      this.menuName = ["Dashboard", "Exams", "Profile", "Settings"];
      this.navLinks = ["/dashboard", "/exams", "/profile", "/settings"];
    }

    if (canActivate(rolePermitted.mentor, this.props.token)) {
      this.faIcons = [
        <FaHome size="1.6em" className="mr-2" />,
        <FaQuestion size="1.6em" className="mr-2" />,
        <FaPen size="1.6em" className="mr-2" />,
        <FaUser size="1.6em" className="mr-2" />,
        <FaTools size="1.6em" className="mr-2" />,
      ];
      this.menuName = [
        "Dashboard",
        "Question",
        "Exam Paper",
        "Profile",
        "Settings",
      ];
      this.navLinks = [
        "/dashboard",
        "/question",
        "/exampaper",
        "/profile",
        "/settings",
      ];
    }
    if (canActivate(rolePermitted.admin, this.props.token)) {
      this.faIcons = [
        <FaHome size="1.6em" className="mr-2" />,
        <FaCog size="1.6em" className="mr-2" />,
        <FaQuestion size="1.6em" className="mr-2" />,
        <FaPen size="1.6em" className="mr-2" />,
        <FaUser size="1.6em" className="mr-2" />,
        <FaTools size="1.6em" className="mr-2" />,
      ];
      this.menuName = [
        "Dashboard",
        "Category",
        "Question",
        "Exam Paper",
        "Profile",
        "Settings",
      ];
      this.navLinks = [
        "/dashboard",
        "/category",
        "/question",
        "/exampaper",
        "/profile",
        "/settings",
      ];
    }

    return (
      <div style={styles}>
        <div className="bottom-border pb-3">
          <Image
            src={avatar}
            roundedCircle={true}
            style={{ width: "50px" }}
            className="mr-3"
          />
          <a href="#" className="text-white ml-3">
            {userName}
          </a>
        </div>
        <Nav className={this.classes.sideNav}>
          {this.faIcons.map((value, index) => (
            <Nav.Item key={index}>
              <NavLink
                to={this.navLinks[index]}
                className={
                  "nav-link " + this.classes.sideNavLink + " sidebar-link"
                }
                activeClassName="current"
              >
                {value}

                {this.menuName[index]}
              </NavLink>
            </Nav.Item>
          ))}
          <div className="hideInMd">
            <SearchForm
              formControl={classes.formControl}
              searchBtn={classes.searchBtn}
            />
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
          </div>
        </Nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserLoader: () => dispatch(getUserLoader()),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

//export default Sidebar;

const classes = {
  formControl: "search-input",
  searchBtn: "search-button",
};

const styles = {
  fontSize: "14px",
};
