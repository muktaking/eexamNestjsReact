import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import NavbarHome from "../../components/navbar/navbarHome";
import { auth } from "../../store/auth";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

import "../../assets/scss/section/registration.scss";

const isValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((v) => {
    v.length > 0 && (valid = false);
  });
  return valid;
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: null,
    password: null,
    formErrors: {
      username: "",
      password: "",
    },
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { username, password, formErrors } = this.state;

    if (isValid(formErrors)) {
      this.props.onAuth(username, password);
      //if(this.props.auth.token !== null){}
      //this.props.history.push({ pathname: "/dashboard" });
      // const token = localStorage.getItem("jwtToken"); //this.props.auth.token;
      // setAuthorizationToken(token);
      // axios
      //   .post("http://localhost:4000/auth/login", {
      //     username,
      //     password,
      //   })
      //   .then((data) => {
      //     //console.log(data.data.accessToken);
      //     this.props.history.push({ pathname: "/dashboard" });
      //     localStorage.setItem("jwtToken", data.data.accessToken);
      //     setAuthorizationToken(data.data.accessToken);
      //   })
      //   .catch((error) => console.log(error.response));
    } else {
      console.log("login failed");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "username":
        formErrors.username = !validator.isEmpty(value)
          ? ""
          : "Email should not be empty";
        break;
      case "password":
        formErrors.password = !validator.isEmpty(value)
          ? ""
          : "Password should not be empty";
        break;
    }
    this.setState({
      formErrors: formErrors,
      [name]: value,
    });
  };

  render() {
    const { formErrors } = this.state;

    let authRedirect;
    if (this.props.isAuthenticated) {
      //const token = localStorage.getItem("jwtToken");
      //setAuthorizationToken(token);
      authRedirect = <Redirect to="/dashboard" />;
    }
    return (
      <div className="registration">
        {authRedirect}
        <NavbarHome isLanding={false} />
        {/* Landing */}
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner"></div>
          </div>
        </div>
        <div className="caption text-center" style={{ top: "15%" }}>
          {/* <Spinner animation="border" role="status"></Spinner> */}
          <h1>Login Form</h1>
          <div className="heading-underline"></div>
          <Form className="mb-4" onSubmit={this.submitHandler}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="username"
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </Form.Group>
            <Button type="submit" className="btn-submit">
              Submit
            </Button>
          </Form>
          <Row>
            {this.props.auth.error && this.props.auth.error.response.statusText}
          </Row>
          <Row>
            <Col md={6}>
              <p className="lead">Forget Your Password</p>
              <a href="" className="btn btn-danger">
                Reset Your Password
              </a>
            </Col>
            <Col md={6}>
              <p className="lead">I am not a member yet!</p>
              <a href="" className="btn btn-secondary">
                Sign up
              </a>
            </Col>
          </Row>
        </div>
        {/* End of Landing */}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) => dispatch(auth(username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    api: state.api,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
