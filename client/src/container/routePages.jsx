import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Landing from "./landing/landing";
import Signup from "./registration/signup";
import Login from "./registration/login";
import InnerContent from "./innerContent/innerContent";
import NotFoundPage from "./404";
import LogoutPage from "./logout";
import { connect } from "react-redux";

const RoutePages = (props) => {
  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Landing} />
      <Route component={NotFoundPage} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/dashboard" component={InnerContent} />
        <Route path="/category" component={InnerContent} />
        <Route path="/question" component={InnerContent} />
        <Route path="/exam" component={InnerContent} />
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
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(RoutePages);
//export default RoutePages;
