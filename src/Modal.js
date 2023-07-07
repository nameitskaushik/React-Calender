import React, { useState, useEffect } from "react";
import { ModalBody } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalPopup({
  showModal,
  itemsList,
  setShowModal,
  setSelectedUser,
  selectedUser,
  handleClose,
  setEventTitle,
  eventTitle,
  allEventsDetails,
  sendToServer,
  setEvents,
  handleEventDelete,
  setEventDiscription,
  eventDiscription,
}) {
  const [show, setShow] = useState(showModal);

  const handleShow = () => {
    setShow(true);
    setShowModal(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="setEventTitle"
            defaultValue={"Event title goes here"}
            onChange={(event) => {
              setEventTitle(event.target.value);
            }}
          />
          <input
            className="setEventDiscription"
            defaultValue={"Event description goes here"}
            onChange={(event) => {
              setEventDiscription(event.target.value);
            }}
          />
          {itemsList.length == 0 ? (
            "Empty List"
          ) : (
            <select
              className="devSelect"
              defaultValue={"Select Dev"}
              name="Developer"
              id="Developer-select"
              onChange={(event) => setSelectedUser(event.target.value)}
            >
              Developer Select
              {itemsList.map((item) => {
                return (
                  <option value={item["uniqueId"]} key={item.uniqueId}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
          <Button
            className="createEvent"
            onClick={() => {
              if (eventTitle && selectedUser) {
                setEvents(allEventsDetails);
                const mydata = {
                  start: allEventsDetails[allEventsDetails.length - 1]["start"],
                  end: allEventsDetails[allEventsDetails.length - 1]["end"],
                  title: eventTitle,
                  discription: eventDiscription,
                  uniqueId: selectedUser,
                };

                sendToServer(mydata);
                handleClose();
              }
            }}
          >
            Create event
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
