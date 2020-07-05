import React from "react";
import { Route } from "react-router-dom";

import Landing from "./landing/landing";
import Signup from "./registration/signup";
import Login from "./registration/login";
import InnerContent from "./innerContent/innerContent";
import { connect } from "react-redux";

const RoutePages = (props) => {
  let routes = (
    <switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={InnerContent} />
        <Route path="/category" exact component={InnerContent} />
        <Route path="/category/:slug" component={InnerContent} />
      </switch>
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
