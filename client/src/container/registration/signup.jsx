//import React from "react";
import React, { Component } from "react";
import validator from "validator";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import NavbarHome from "../../components/navbar/navbarHome";
import Spinner from "react-bootstrap/Spinner";

import "../../assets/scss/section/registration.scss";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  Object.values(formErrors).forEach((v) => {
    v.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((v) => {
    v === null && (valid = false);
  });
  return valid;
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.passwordRef = React.createRef();

    this.state = {
      loading: false,
      firstName: null,
      lastName: null,
      userName: null,
      password: null,
      repeatPassword: null,
      gender: "male",
      errorMessage: null,
      formErrors: {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        repeatPassword: "",
        checked: "",
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    this.setState({ errorMessage: null });

    switch (name) {
      case "firstName":
        formErrors.firstName = validator.isLength(value, { min: 3, max: 15 })
          ? ""
          : "First Name should be minimum 3 or maximum 20 characters";
        break;
      case "lastName":
        formErrors.lastName = validator.isLength(value, { min: 3, max: 15 })
          ? ""
          : "Last Name should be minimum 3 or maximum 20 characters";
        break;
      case "userName":
        formErrors.userName =
          validator.isLength(value, { min: 3, max: 15 }) &&
          validator.isAlphanumeric(value)
            ? ""
            : "Username should be alpha neumaric with minimum 3 or maximum 20 characters";
        break;
      case "email":
        formErrors.email = validator.isEmail(value)
          ? ""
          : "Email address is not valid";
        break;
      case "password":
        formErrors.password = validator.matches(
          value,
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        )
          ? ""
          : "Password should be minimum 8 characters and contain atleast one capital and lowercase alpha, neumeric and special value";
        break;
      case "repeatPassword":
        formErrors.repeatPassword = validator.equals(
          value,
          this.passwordRef.current.value
        )
          ? ""
          : "Password and RepeatPassword should be same";
        break;
      //case "gender":
      // formErrors.password = validator.isIn(value,["male","female"])
      //   ? ""
      //   : "Password should be minimum 8 characters and contain one alpha,neumeric and special value";
      // break;
      case "checked":
        formErrors.checked = e.target.checked ? "" : "Check Me is not selected";
        break;
    }

    this.setState({
      formErrors: formErrors,
      [name]: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ errorMessage: null });
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      repeatPassword,
      gender,
      formErrors,
    } = this.state;
    this.setState({ loading: true });

    if (
      formValid({
        firstName,
        lastName,
        userName,
        email,
        password,
        repeatPassword,
        gender,
        formErrors,
      })
    ) {
      axios
        .post("http://localhost:4000/auth/registration", {
          firstName,
          lastName,
          userName,
          email,
          password,
          repeatPassword,
          gender,
        })
        .then((res) => {
          this.setState({ loading: false });
          if (res.status === 201) {
            // <Route exact path="/">
            this.props.history.push({ pathname: "/login" });
            // </Route>;
          }
        })

        .catch((e) => {
          this.setState({ loading: false });
          //  console.log("/b/b onError:  ", e.response);
          if (e.response) {
            // if server has response
            e = e.response;
            if (e.data.statusCode === 409) {
              // user duplication error, so redirecting to login page
              this.setState({
                errorMessage: e.data.message + " Redirecting .....",
              });
              setTimeout(() => {
                this.props.history.push({ pathname: "/login" });
              }, 3000);
            } else if (e.data.statusCode === 400) {
              // specific server validation error
              let message = "";
              e.data.message.forEach((v) => {
                message += `${v.value} is not valid in [ ${
                  v.property
                } ] field due to " ${Object.values(
                  v.constraints
                ).toString()} "`;
              });
              //  console.log(message);
              this.setState({
                errorMessage: message,
              });
            } else {
              // for any other server error response
              this.props.history.push({ pathname: "/" });
            }
          } else {
            // if server has no any response
            this.setState({
              errorMessage: "Server may be down. Please try sometime later",
            });
          }
        });
    } else {
      this.setState({
        loading: false,
        errorMessage: "Please fill form correctly.",
      });
    }
  };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="registration">
        <NavbarHome isLanding={false} />
        {/* Landing */}
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner"></div>
          </div>
        </div>
        <div className="caption text-center">
          <h1>Registration Form</h1>
          {this.state.loading && (
            <Spinner
              animation="border"
              role="status"
              variant="light"
              className="mb-2"
            ></Spinner>
          )}
          <div className="heading-underline"></div>

          <Form onSubmit={this.submitHandler} novalidate>
            <div className="text-white mb-2 bg-danger">
              {this.state.errorMessage}
            </div>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name: </Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder="Eaqub"
                  onChange={this.handleChange}
                  className={formErrors.firstName.length > 0 && "is-invalid"}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder="Sarder"
                  onChange={this.handleChange}
                  className={formErrors.lastName.length > 0 && "is-invalid"}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridUserName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="userName"
                  type="text"
                  placeholder="Enter username"
                  onChange={this.handleChange}
                  className={formErrors.userName.length > 0 && "is-invalid"}
                />
                {formErrors.userName.length > 0 && (
                  <span className="errorMessage">{formErrors.userName}</span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleChange}
                  className={formErrors.email.length > 0 && "is-invalid"}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  ref={this.passwordRef}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  className={formErrors.password.length > 0 && "is-invalid"}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  name="repeatPassword"
                  type="password"
                  placeholder="Enter again Password"
                  onChange={this.handleChange}
                  className={
                    formErrors.repeatPassword.length > 0 && "is-invalid"
                  }
                />
                {formErrors.repeatPassword.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.repeatPassword}
                  </span>
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  name="gender"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                name="checked"
                type="checkbox"
                label="By checking the box, You will agree our terms and conditions."
                //checked={true}
                onChange={this.handleChange}
                className={formErrors.checked.length > 0 && "is-invalid"}
              />
              {formErrors.checked.length > 0 && (
                <span className="errorMessage">{formErrors.checked}</span>
              )}
            </Form.Group>

            <Button type="submit" className="btn-submit">
              Submit
            </Button>
          </Form>
        </div>
        {/* End of Landing */}
      </div>
    );
  }
}

export default SignUp;
