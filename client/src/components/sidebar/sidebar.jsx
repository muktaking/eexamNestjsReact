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

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  classes = {
    sideNav: ["flex-column", "mt-4"].join(" "),
    sideNavLink: ["text-white", "p-3", "mb-2"].join(" "),
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
      <div>
        <Navbar.Brand
          href="#home"
          className="text-white d-block mx-auto text-center py-3 mb-4 bottom-border"
        >
          E-Exam
        </Navbar.Brand>
        <h3 className="text-white text-center">Welcome Back</h3>
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
