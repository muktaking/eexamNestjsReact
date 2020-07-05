import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalBox = props => {
  return (
    <Modal show={props.show} onHide={props.modalHandleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Want to leave?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please logout to leave</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.modalHandleClose}>
          Stay here
        </Button>
        <Button variant="danger" onClick={props.modalHandleClose}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
