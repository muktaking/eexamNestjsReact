import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
// import Navbar from "./components/layouts/layouts";
// import Modal from "./components/modal/modal";
import RoutePages from "./container/routePages";
import { checkAuthState } from "./store/auth";

class App extends Component {
  state = {
    modalShow: false,
  };

  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };
  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };

  componentDidMount() {
    this.props.onTryAutologin();
  }
  render() {
    return (
      <BrowserRouter>
        {/* <Navbar logoutClick={this.modalShowHandler} />
        <Modal
          show={this.state.modalShow}
          modalHandleClose={this.modalCloseHandler}
        /> */}
        <RoutePages />
        {/* <Signup /> */}
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutologin: () => {
      dispatch(checkAuthState());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
