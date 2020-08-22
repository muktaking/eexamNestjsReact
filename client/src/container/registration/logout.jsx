import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logoutLoader } from "../../store/auth";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogoutLoader();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutLoader: () => {
      dispatch(logoutLoader());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
