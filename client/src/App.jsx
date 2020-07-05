import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

// import Navbar from "./components/layouts/layouts";
// import Modal from "./components/modal/modal";
import RoutePages from "./container/routePages";

class App extends Component {
  state = {
    modalShow: false
  };

  modalShowHandler = () => {
    this.setState({ modalShow: true });
  };
  modalCloseHandler = () => {
    this.setState({ modalShow: false });
  };
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

export default App;
