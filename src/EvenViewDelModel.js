import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import "./App.css";

export default function ModalPopups({
  handleClose,
  delData,
  showViewModal,
  setViewModal,
  state,
}) {
  const [show, setShow] = useState(showViewModal);
  const handleShow = () => {
    setShow(true);
    setViewModal(true);
  };
  return (
    <Modal show={showViewModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="eventTitle">
        <div>
          <p> Event Title :</p>
          {console.log(state)}
          <div>{state.title}</div>

          <div> </div>
          <p> Event description :</p>
          <div>{state.discription}</div>
        </div>
      </Modal.Body>
      <Button
        className="closeButton"
        onClick={() => {
          handleClose();
        }}
      >
        Close
      </Button>
      {sessionStorage.getItem("userrole") === "Manager" ? (
        <Button
          className="deleteButton"
          onClick={() => {
            delData(state.id);
            handleClose();
          }}
        >
          Delete
        </Button>
      ) : null}
    </Modal>
  );
}
