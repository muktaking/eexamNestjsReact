import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "./landing/landing";
import Signup from "./registration/signup";
import Login from "./registration/login";
import InnerContent from "./layout";
import NotFoundPage from "./404";
import LogoutPage from "./registration/logout";

import { rolePermitted, canActivate } from "../utils/canActivate";

const RoutePages = (props) => {
  // const tokenRole = props.token ? jwtDecode(props.token).role : -1;
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/free" exact component={InnerContent} />
      <Route path="/free/:id" component={InnerContent} />
      <Route path="/result" component={InnerContent} />
      <Route path="/" exact component={Landing} />
      <Route component={NotFoundPage} />
    </Switch>
  );
  if (
    props.isAuthenticated &&
    canActivate(rolePermitted.student, props.token)
  ) {
    console.log("student");
    routes = (
      <Switch>
        <Route path="/dashboard" component={InnerContent} />
        <Route path="/exams" component={InnerContent} />
        <Route path="/exams/:id" component={InnerContent} />
        <Route path="/result" component={InnerContent} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  if (canActivate(rolePermitted.mentor, props.token)) {
    console.log("mentor");
    routes = (
      <Switch>
        <Route path="/dashboard" component={InnerContent} />
        <Route path="/question" component={InnerContent} />
        <Route path="/exampaper" component={InnerContent} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  if (canActivate(rolePermitted.admin, props.token)) {
    console.log("admin");
    routes = (
      <Switch>
        <Route path="/dashboard" component={InnerContent} />
        <Route path="/category" component={InnerContent} />
        <Route path="/question" component={InnerContent} />
        <Route path="/exampaper" component={InnerContent} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/" exact component={Landing} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  return routes;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(RoutePages);
//export default RoutePages;
