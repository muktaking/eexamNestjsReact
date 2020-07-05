import React, { Component } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import avatorImg from "../../assets/image/admin.jpeg";

import setAuthorizationToken from "../../utils/setAuthorizationToken";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  classes = {
    sideNav: ["flex-column", "mt-4"].join(" "),
    sideNavLink: ["text-white", "p-3", "mb-2"].join(" "),
    fa: ["text-light", "fa-lg", "mr-3"].join(" ")
  };

  faIcons = [
    "home",
    "user",
    "envelope",
    "shopping-cart",
    "chart-line",
    "chart-bar",
    "table",
    "wrench",
    "file-alt"
  ];
  menuName = [
    "Dashboard",
    "Profile",
    "Inbox",
    "Sales",
    "Analytics",
    "Charts",
    "Tables",
    "Settings",
    "Documentation"
  ];
  navLinks = [
    "/dashboard",
    "/category",
    "/api1",
    "/api2",
    "/api3",
    "/api4",
    "/api5",
    "/api6",
    "/api7"
  ];
  state = {
    userName: null
  };
  componentDidMount() {
    setAuthorizationToken(localStorage.getItem("jwtToken"));
    axios
      .get("http://localhost:4000/users/")
      .then(data =>
        this.setState({
          userName: data.data.userName
        })
      )
      .catch(error => console.log(error));
  }
  render() {
    return (
      <>
        <Navbar.Brand
          href="#home"
          className="text-white d-block mx-auto text-center py-3 mb-4 bottom-border"
        >
          React-Bootstrap
        </Navbar.Brand>
        <div class="bottom-border pb-3">
          <Image
            src={avatorImg}
            roundedCircle={true}
            style={{ width: "50px" }}
            className="mr-3"
          />
          <a href="#" className="text-white">
            {this.state.userName}
          </a>
        </div>
        <Nav className={this.classes.sideNav}>
          {this.faIcons.map((value, index) => (
            <Nav.Item>
              <NavLink
                to={this.navLinks[index]}
                className={
                  "nav-link " + this.classes.sideNavLink + " sidebar-link"
                }
                activeClassName="current"
              >
                <FontAwesomeIcon
                  icon={value}
                  size="lg"
                  className={this.classes.fa}
                />
                {this.menuName[index]}
              </NavLink>
            </Nav.Item>
          ))}
        </Nav>
      </>
    );
  }
}

export default Sidebar;