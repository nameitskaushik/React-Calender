import { useState, useCallback, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ModalPopup from "./Modal";
import ModalPopups from "./EvenViewDelModel";

const Scheduler = (props) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayViewModal, setDisplayViewModal] = useState(false);
  const [developersList, setDeveloperList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDiscription, setEventDiscription] = useState("");
  const [allEventsDetails, setAllEventsDetails] = useState([]);
  const [myEvents, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const [state, setState] = useState("");

  useEffect(() => {
    getDeveloperDetails();
    getData();
  }, []);

  const delData = async (eventId) => {
    try {
      await fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
      });
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    fetch("http://localhost:8000/events")
      .then((response) => response.json())
      .then((json) => setEvents(json));
  };

  const filterEventsByDeveloper = () => {
    if (myEvents.length) {
      const uniqueId = sessionStorage.getItem("UniqueId");
      let filterByUniqueId = [...myEvents].filter((event) => {
        return event["uniqueId"] == uniqueId;
      });
      return filterByUniqueId;
    }
  };
  const getDeveloperDetails = async () => {
    const response = await fetch("http://localhost:8000/user"); // Replace with the URL of your JSON server
    const data = await response.json();
    if (data) {
      const devData = await data.filter((user) => user["role"] == "developer");
      setDeveloperList(devData);
      setSelectedUser(devData[0]?.uniqueId);
    }
  };

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      if (sessionStorage.getItem("userrole") === "developer") {
        window.alert(
          "you dont have permission to create this event.please contact manager."
        );
        return;
      }
      setDisplayModal(true);
      // setEvents((prev) => [...prev, { start, end, eventTitle, selectedUser }]);
      console.log(myEvents, "myEvents before");
      setAllEventsDetails(() => [
        ...myEvents,
        {
          start,
          end,
          title: eventTitle,
          discription: eventDiscription,
          uniqueId: selectedUser,
        },
      ]);
      console.log(myEvents, "myEvents after");
      // const mydata = {
      //   start: start,
      //   end: end,
      //   title: eventTitle,
      //   uniqueId: selectedUser,
      // };
      // sendToServer(mydata);
    },
    [setEvents]
  );

  // useEffect(() => {
  //   if (sessionStorage.getItem("userrole") === "developer") {
  //     filterEventsByDeveloper();
  //   }
  // }, [myEvents]);

  const sendToServer = async (data) => {
    const newData = { ...data };
    console.log(newData, "sendToServer");
    fetch("http://localhost:8000/events/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newData),
    })
      .then((res) => {
        console.log(res, 47);
        getData();
      })
      .catch((err) => {
        console.log("Failed", err.message);
      });
  };

  const handleEventDelete = (event) => {
    // window.alert(
    //   `Event Details : ${event.title} & Event Description: ${event.discription}`
    // );
    setDisplayViewModal(true);
    setState(event);
    setDisplayViewModal(true);
  };

  // const confirmDelete = window.confirm(
  //   `Are you sure you want to delete this event : ${event.title}?`
  // );

  // if (confirmDelete) {
  //   delData(event.id);
  // }

  const handleClose = () => {
    setDisplayModal(false);
    setDisplayViewModal(false);
  };

  return (
    <div>
      {displayModal ? (
        <ModalPopup
          showModal={displayModal}
          // showViewModal={displayViewModal}
          itemsList={developersList}
          setShowModal={setDisplayModal}
          // setViewModal={setDisplayViewModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          handleClose={handleClose}
          setEventTitle={setEventTitle}
          eventDiscription={eventDiscription}
          setEventDiscription={setEventDiscription}
          eventTitle={eventTitle}
          allEventsDetails={allEventsDetails}
          sendToServer={sendToServer}
          setEvents={setEvents}
          delData={delData}
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            height: 100,
          }}
        />
      ) : null}

      {displayViewModal ? (
        <ModalPopups
          showViewModal={displayViewModal}
          // setViewModal={setDisplayViewModal}

          setEventTitle={setEventTitle}
          handleClose={handleClose}
          delData={delData}
          state={state}
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            height: 100,
          }}
        />
      ) : null}

      <Calendar
        localizer={localizer}
        events={
          sessionStorage.getItem("userrole") === "developer"
            ? filterEventsByDeveloper()
            : myEvents
        }
        onSelectEvent={handleEventDelete}
        // onSelectEvent={(event) => this.onSelectEvent(event)}
        onSelectSlot={handleSelectSlot}
        // onView={handleViewEvent}
        selectable
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 500,
          // width: 1300,
          display: "flex",
          // paddingLeft: 70,
          paddingTop: 50,
          // alignItems: "center",
        }}
      />
    </div>
  );
};
export default Scheduler;
