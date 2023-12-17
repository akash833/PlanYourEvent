import React, { useEffect, useRef, useState } from "react";
import  { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Cookies from "js-cookie";
import { CALL_GET_API, CALL_POST_API, POST_MEDIA } from "src/api";
import Layout from "./components/layout";
import {
  getSuccessNotification,
  getErrorNotification,
  getWarningNotification
} from "./components/utility/notification";
import AppNotification from "./components/utility/notification";
import AppLoader from "./components/utility/loader";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Switch } from "@mui/material";
import { FiCalendar } from "react-icons/fi";

const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventData, setEventData] = useState({});

  console.log(eventData);
  const [eventTitle, setEventTitle] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [guest, setGuest] = useState<any[]>([]);
 const [startDate, setstartDate] = useState<any>();
 const [endDate, setEndDate] = useState<any>();

  const [eventDescription, setEventDescription] = useState("");
  const [eventSubHeading, seteventSubHeading] = useState("");
  // const [guestList, setGuestList] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [eventType, setEventType] = useState("Public");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({});

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [cities, setCities] = useState([]);
  const isPrivateEvent = eventType === "Private";
  const [futureDateNew, setFutureDate] = useState<string>("");
  const [showRemainingCount, setShowRemainingCount] = useState(false);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowDate = tomorrow.toISOString().split("T")[0];
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false); 
  // const [imgDimension, setImgDimension] = useState(false);

  const endDateFunction = async (e: any) => {
    setEndDate(e._d);
    // if (startDate) {
    //   const nextDate = new Date(startDate);
    //   nextDate.setDate(nextDate.getDate() + 1);
    //   const date = nextDate.toISOString().split("T")[0];
    //   setFutureDate(date ? date : "");
    // }
  };

    const startDateFunction = async (e: any) => {
      const selectedDate = e._d;
      setstartDate(selectedDate);
      if (e._d) {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        const date = nextDate.toISOString().split("T")[0];
        setFutureDate(date ? date : "");
      }
    };

      const clickStartInput = () => {
        document.getElementById("startDateId")?.click();
      };
      const clickEndInput = () => {
        document.getElementById("endDateId")?.click();
      };

  const getCity = async () => {
    const { data } = await CALL_GET_API("master_data/all");
    const master_data = data.data;
    const cities = master_data.filter(function (item: any) {
      return item.type == "LOCATIONS";
    });
    setCities(cities);
  };

  const getEventById = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    const { success, data } = await CALL_GET_API(
      `events/get-eventById?_id=${eventId}`
    );

    if (success) {
      console.log(data);
      setEventData(data.data);
      setEventTitle(data.data.eventTitle);
      setTickets(data.data.ticket);
     
      setEventDescription(data.data.eventDescription);
      setSelectedCity(data.data.city);
      seteventSubHeading(data.data.eventTypeSubHeading);
      setEventType(data.data.eventType);
      setGuest(data.data.guestList);
      setAddress(data.data.Address);
      setTickets(data.data.ticket);
      setSelectedImages(data.data.eventPhotosUrl);
      setShowRemainingCount(data.data.showRemainingCount);
      const startDate = new Date(data.data.startTime);
      setstartDate(startDate);
      const endDate = new Date(data.data.endTime);
      setEndDate(endDate);
    } else {
      console.error("Error fetching event data:", data);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  useEffect(() => {
    if (id) {
      getEventById();
      setIsEditMode(true);
    }
  }, [id]);

  const [newTicket, setNewTicket] = useState({
    name: "",
    event: "",
    tickets: "",
    amount: "",
    showRemainingCount: false,
  });

  const [newGuest, setNewGuest] = useState({
    para: "",
  });



  const fileInputRef = useRef(null);

  const handleCancelEvent = async () => {
    setShowTicketForm(false);
  };

  const handleCancelGuest = async() => {
    setShowGuestForm(false);
  };

  const removeTicket = async (e: any) => {
    const index = tickets.findIndex(
      (item: any) =>
        item.name === e.name &&
        item.event === e.event &&
        item.amount === e.amount &&
        item.tickets === e.tickets
    );
    tickets.splice(index, 1);
    setTickets(() => [...tickets]);
  };

  const removeGuest = async( e:any ) =>{
    const index = guest.findIndex(
      (item: any) =>
        item.para === e.para 
    );
    guest.splice(index, 1);
    setGuest(() => [...guest]);
  };


  const removeEventImage = async (e: any) => {
    const index = selectedImages.map((e) => e).indexOf(e);
    selectedImages.splice(index, 1);
    setSelectedImages(() => [...selectedImages]);
  };

  const handleAddEvent = () => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    setShowTicketForm(false);
  };

  const handleAddGuest = () => {
    setGuest((prevGuests) => [...prevGuests, newGuest]);
    console.log(guest)
    setShowGuestForm(false);
  } 

  const addTicket = () => {
    setNewTicket({
      name: "",
      event: "",
      tickets: "",
      amount: "",
      showRemainingCount: false,
    });
    setShowTicketForm(true);
  };

  const addGuest = () => {
     setNewGuest({
       para: ""
     });
    setShowGuestForm(true);
  }

  const handleTicketChange = (key: string, value: string) => {
    setNewTicket((prevTicket) => {
      return {
        ...prevTicket,
        [key]: value,
      };
    });
  };


    const handleGuestChange = (key: string, value: string) => {
      setNewGuest((prevGuest) => {
        return {
          ...prevGuest,
          [key]: value,
        };
      });
    };

  const createEvent = async () => {
    const accessToken: string = Cookies.get("token") ?? "";

    const myHeaders = new Headers();
    myHeaders.append("accesstoken", accessToken);
    myHeaders.append("Content-Type", "application/json");
    const eventData = {
      _id: id,
      eventTitle: eventTitle,
      startTime: startDate,
      endTime: endDate,
      eventDescription: eventDescription,
      city: selectedCity,
      eventPhotosUrl: selectedImages,
      eventTypeSubHeading: eventSubHeading,
      ticket: tickets,
      eventType: eventType,
      guestList: guest,
      Address: address,
      showRemainingCount: showRemainingCount,
      isActive: true
    };

    setIsLoading(true);
    try {
      const endpoint = isEditMode ? "events/update-eventById" : "events";
      const { success } = await CALL_POST_API(endpoint, eventData);
      if (success) {
        setNotification(
          getSuccessNotification(
            isEditMode
              ? "Event updated successfully!"
              : "Event created successfully!"
          )
        );
        clearForm();
        router.push("/events"); // Redirect to event list page or wherever you want
      } else {
        setNotification(getErrorNotification("Error"));
      }
    } catch (err) {
      setNotification(getErrorNotification("Error"));
    }
    setIsLoading(false);
  };

  const clearForm = () => {
    setEventTitle("");
    setstartDate("");
    setEndDate("");
    setEventDescription("");
    seteventSubHeading("");
    setGuest([]);
    setAddress("");
    setSelectedCity("Select City");
    setEventType("Public");
    setSelectedImages([]);
    setTickets([]);
    setShowRemainingCount(false);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    await createEvent();
  };

  const postImage = async (files: FileList | null) => {
    if (!files) {
      return;
    }

    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await POST_MEDIA("util/image", formData);

        urls.push(response.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      //  const images = (
      //    <ImageGallery
      //      imageUrls={urls}
      //      setImgDimension={setImgDimension}
      //    />
      //  );


    }

    setSelectedImages((prevImages) => [...prevImages, ...urls]);
  };

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const image = new Image();
  
      image.onload = () => {
        const width = image.width;
        const height = image.height;
  
        if (width < 400 || height < 400) {
          setNotification(getWarningNotification("Image resolution should be at least 400x400 pixels."));
        } else {
          postImage(files);
        }
      };
      image.src = URL.createObjectURL(files[0]);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file as any)
    );
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleChooseFiles = () => {
    document.getElementById("dropImg")?.click();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <Layout title="Add New Event" description="Add New Event">
        <div className="setting-notify">
          <AppNotification notification={notification} />
        </div>
        <div className="create-event">
          <p className="text-white">
            {isEditMode ? "Edit Event" : "Create New Event"}
          </p>
          <div className="create-event-child">
            <div className="width-both">
              <input
                type="text"
                placeholder="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                maxLength={162}
              />
              <div className="flex justify-between">
                <div className="NewDateTimeInput flex items-center justify-between">
                  <Datetime
                    onChange={startDateFunction}
                    // isValidDate={(current) =>
                    //   current.isBetween(tomorrowDate, maxDate, null, '[]')
                    // }
                    isValidDate={(current) =>
                      current.isSameOrAfter(tomorrowDate, "day")
                    }
                    value={startDate}
                    inputProps={{
                      placeholder: "Start/End date & time",
                      id: "startDateId",
                    }}
                    className="datetimeInput"
                  />
                  <FiCalendar
                    style={{ marginRight: "14px" }}
                    onClick={clickStartInput}
                  />
                </div>
                <div className="NewDateTimeInput flex items-center justify-between">
                  <Datetime
                    onChange={endDateFunction}
                    // isValidDate={(current) =>
                    //   current.isBetween(tomorrowDate, maxDate, null, '[]')
                    // }
                    isValidDate={(current) =>
                      current.isSameOrAfter(futureDateNew, "day")
                    }
                    value={endDate}
                    inputProps={{
                      placeholder: "Start/End date & time",
                      id: "endDateId",
                      disabled: !startDate,
                    }}
                    className="datetimeInput"
                  />
                  <FiCalendar
                    style={{ marginRight: "14px" }}
                    onClick={clickEndInput}
                  />
                </div>
                {/* <input
                  type="datetime-local"
                  placeholder="Start/End date & time"
                  value={startDate}
                  onChange={(e) => setstartDate(e.target.value)}
                  className=""
                  min={`${tomorrowDate}T00:00`}
                  style={{ width: "49%" }}
                />
                <input
                  type="datetime-local"
                  placeholder="Start/End date & time"
                  value={endDate}
                  min={`${futureDateNew}T00:00`}
                  onChange={(e) => setEndDate(e.target.value)}
                  onClick={endDateFunction}
                  style={{ width: "49%" }}
                  disabled={!startDate}
                /> */}
              </div>

              <textarea
                className="textarea"
                placeholder="General Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />

              <div className="background-gray  items-center justify-between rounded-lg px-2.5 py-1.5">
                <div>
                  <div className="msg">City</div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="border-none bg-transparent text-xs text-white focus:ring-0 w-full"
                    style={{ backgroundColor: "#20262D" }}
                  >
                    <option> Select City</option>
                    {cities.map((city: any) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                className="drop-photos flex items-center justify-center rounded-lg cursor-pointer"
                onClick={handleChooseFiles}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="">
                  <p className="text-xs text-white">Event Photos</p>
                  <p className="text-xs text-white">
                    Drag and Drop Photos Here To Upload
                  </p>
                  <p className="text-xs text-white">
                    Image resolution should be atleast 400 * 400 px
                  </p>
                  <button>Choose Images</button>
                </div>
              </div>
              <input
                id="dropImg"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                multiple
              />
              <div
                className="selected-images"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  // justifyContent:'space-between'
                }}
              >
                {selectedImages.map((imageUrl) => (
                  <div key={imageUrl} className="circle-image relative">
                    <div
                      className="removeEventImg"
                      onClick={() => removeEventImage(imageUrl)}
                    >
                      <AiOutlineCloseCircle />
                    </div>
                    <img
                      src={imageUrl}
                      alt="Selected Event"
                      style={{
                        width: "90px",
                        height: "60px",
                        objectFit: "cover",
                        border: "dotted",
                        margin: "10px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="width-both">
              <input
                type="text"
                placeholder="Event Type (Sub-Heading)"
                value={eventSubHeading}
                onChange={(e) => seteventSubHeading(e.target.value)}
                maxLength={162}
              />
              <div className="event-radio flex items-center gap-7">
                <p className="text-xs text-white">Event Type</p>
                <div className="flex gap-2">
                  <input
                    className="form-check-input event-radio"
                    type="radio"
                    name="inlineRadioOptions"
                    id="public"
                    value="Public"
                    checked={eventType === "Public"}
                    onChange={() => setEventType("Public")}
                  />
                  <label
                    className="form-check-label text-xs text-white"
                    htmlFor="public"
                  >
                    Public
                  </label>
                </div>
                <div className="flex gap-2">
                  <input
                    className="form-check-input event-radio"
                    type="radio"
                    name="inlineRadioOptions"
                    id="private"
                    value="Private"
                    checked={eventType === "Private"}
                    onChange={() => setEventType("Private")}
                  />
                  <label
                    className="form-check-label text-xs text-white"
                    htmlFor="private"
                  >
                    Private
                  </label>
                </div>
              </div>

              {!isPrivateEvent && (
                <div className="graph py-3 px-6 mt-5 bg-lg-gray">
                  <div className="flex justify-between py-2 cursor-pointer">
                    <p className="text-white text-sm">Ticket Types & Prices</p>
                    <img
                      src={`${router.basePath}/assets/images/imgAdd.png`}
                      className="w-6"
                      alt=""
                      onClick={addTicket}
                    />
                  </div>
                  {/* {tickets.length > 0 ? (
                  
                  ) : (
                    <></>
                  )} */}

                  {tickets.map((ev: any) => {
                    return (
                      <div key={ev.name} className="flex py-5 items-center">
                        <div className="w-2/12">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 110 104"
                            fill="none"
                            className="max-w-full"
                          >
                            <ellipse
                              cx="54.6"
                              cy="51.794"
                              rx="54.6"
                              ry="51.3275"
                              fill="#13B497"
                            />
                            <path
                              d="M50.1988 34.3903L26.3677 56.793C25.7911 57.3351 25.7911 58.214 26.3677 58.756L32.0231 64.0725C32.4341 64.4589 33.0478 64.5826 33.5912 64.3887C35.7607 63.6146 38.2214 64.1098 39.8601 65.6503C41.4987 67.1907 42.0255 69.504 41.2021 71.5434C40.9958 72.0542 41.1274 72.6312 41.5384 73.0175L47.1939 78.3341C47.7706 78.8761 48.7055 78.8761 49.2821 78.3341L73.1132 55.9313L50.1988 34.3903Z"
                              fill="white"
                            />
                            <path
                              d="M82.8322 44.8319L77.1767 39.5154C76.7657 39.129 76.1519 39.0052 75.6086 39.1992C73.4391 39.9733 70.9785 39.478 69.3398 37.9375C67.7012 36.3971 67.1744 34.0839 67.9978 32.0444C68.204 31.5337 68.0723 30.9567 67.6614 30.5703L62.0059 25.2538C61.4293 24.7118 60.4943 24.7118 59.9177 25.2538L52.287 32.4272L75.2015 53.9683L82.8322 46.7949C83.4088 46.2529 83.4088 45.374 82.8322 44.8319Z"
                              fill="white"
                            />
                          </svg>
                        </div>

                        <div className="name w-10/12">
                          <p className="tickets-types">{ev.name}</p>
                          <div className="flex justify-between">
                            <div className="flex-col flex">
                              <small className="text-color">
                                {ev.tickets} Tickets
                              </small>
                              <small className="text-color">{ev.event}</small>
                              {ev.showRemainingCount ? (
                                <small
                                  className="text-color"
                                  style={{ color: "#13B497" }}
                                >
                                  Remaining tickets will be displayed on UI
                                </small>
                              ) : (
                                <></>
                              )}
                            </div>
                            {/* <small className="text-color" style={{marginTop: ev.showRemainingCount ? "8px" : ""}}>${ev.amount}</small> */}
                          </div>
                        </div>

                        <div
                          style={{ color: "#fff" }}
                          className="ml-2 cursor-pointer flex items-center"
                          onClick={() => removeTicket(ev)}
                        >
                          <small className="text-color">${ev.amount}</small>
                          <AiOutlineDelete className="w-5 h-5 ml-1" />
                        </div>
                      </div>
                    );
                  })}
                  {showTicketForm ? (
                    <div className="flex py-5">
                      <div className="name w-full ticketForm">
                        <input
                          type="text"
                          value={newTicket.name}
                          placeholder="Ticket Type (i.e GA)"
                          onChange={(e) =>
                            handleTicketChange("name", e.target.value)
                          }
                        />

                        <textarea
                          className="textarea"
                          value={newTicket.event}
                          placeholder="Description of ticket type"
                          onChange={(e) =>
                            handleTicketChange("event", e.target.value)
                          }
                        />

                        <div className="">
                          <div className="flex justify-between">
                            <input
                              type="number"
                              value={newTicket.tickets}
                              style={{ width: "49%" }}
                              placeholder="Tickets"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                const nonNegativeValue = Math.max(1, value);
                                const cappedValue = Math.min(
                                  3000000,
                                  nonNegativeValue
                                );
                                handleTicketChange(
                                  "tickets",
                                  cappedValue.toString()
                                );
                              }}
                              min={1}
                              max={3000000}
                              maxLength={7}
                            />
                            <input
                              type="number"
                              value={newTicket.amount}
                              style={{ width: "49%" }}
                              placeholder="Price Per Ticket"
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                const nonNegativeValue = Math.max(1, value);
                                const cappedValue = Math.min(
                                  9999,
                                  nonNegativeValue
                                );
                                handleTicketChange(
                                  "amount",
                                  cappedValue.toString()
                                );
                              }}
                              min={1}
                              max={9999}
                              maxLength={4}
                            />
                          </div>
                          <div className="form-check form-switch flex items-baseline">
                            <div>
                              <Switch
                                checked={newTicket.showRemainingCount}
                                // onChange={(e: any) =>
                                //   setShowRemainingCount(e.target.checked)
                                // }
                                onChange={(e: any) =>
                                  handleTicketChange(
                                    "showRemainingCount",
                                    e.target.checked
                                  )
                                }
                                id="flexSwitchCheckChecked"
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            </div>

                            <label
                              className="form-check-label text-white ml-2 text-xs"
                              style={{ marginBottom: "22px" }}
                              htmlFor="flexSwitchCheckChecked"
                            >
                              Show remaining tickets count on UI
                            </label>
                          </div>
                          <div
                            className="flex justify-between"
                            // style={{ width: "49%" }}
                          >
                            <button
                              className="create-event-btn rounded-lg text-sm text-white text-center ticketsBtn"
                              disabled={
                                !newTicket.tickets ||
                                !newTicket.name ||
                                !newTicket.amount
                              }
                              style={{
                                padding: "10px 20px",
                                marginTop: -3,
                                height: "38px",
                                width: "49%",
                              }}
                              onClick={() => handleAddEvent()}
                            >
                              Add Ticket
                            </button>

                            <button
                              className="create-event-btn rounded-lg text-sm text-white text-center ticketsBtn"
                              style={{
                                background: "#979595",
                                padding: "10px 20px",
                                marginTop: -3,
                                height: "38px",
                                width: "49%",
                              }}
                              onClick={() => handleCancelEvent()}
                            >
                              Cancel Ticket
                            </button>
                          </div>
                        </div>
                        <small className="text-color"></small>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
              {/* <textarea
                className="textarea mt-5"
                rows={4}
                placeholder="Guest List"
                value={guestList}
                onChange={(e) => setGuestList(e.target.value)}
              /> */}
              <div className="graph py-3 px-6 mt-5 bg-lg-gray">
                <div className="flex justify-between py-2 cursor-pointer">
                  <p className="text-white text-sm">Guest List</p>
                  <img
                    src={`${router.basePath}/assets/images/imgAdd.png`}
                    className="w-6"
                    alt=""
                    onClick={addGuest}
                  />
                </div>

                {guest.length !== 0 ? (
                  <>
                    {guest.map((ev: any) => {
                      return (
                        <div key={ev.name} className="flex py-5 items-center">
                          <div className="w-2/12">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="50"
                              viewBox="0 0 110 104"
                              fill="none"
                              className="max-w-full"
                            >
                              <ellipse
                                cx="54.6"
                                cy="51.794"
                                rx="54.6"
                                ry="51.3275"
                                fill="#13B497"
                              />
                              <path
                                d="M50.1988 34.3903L26.3677 56.793C25.7911 57.3351 25.7911 58.214 26.3677 58.756L32.0231 64.0725C32.4341 64.4589 33.0478 64.5826 33.5912 64.3887C35.7607 63.6146 38.2214 64.1098 39.8601 65.6503C41.4987 67.1907 42.0255 69.504 41.2021 71.5434C40.9958 72.0542 41.1274 72.6312 41.5384 73.0175L47.1939 78.3341C47.7706 78.8761 48.7055 78.8761 49.2821 78.3341L73.1132 55.9313L50.1988 34.3903Z"
                                fill="white"
                              />
                              <path
                                d="M82.8322 44.8319L77.1767 39.5154C76.7657 39.129 76.1519 39.0052 75.6086 39.1992C73.4391 39.9733 70.9785 39.478 69.3398 37.9375C67.7012 36.3971 67.1744 34.0839 67.9978 32.0444C68.204 31.5337 68.0723 30.9567 67.6614 30.5703L62.0059 25.2538C61.4293 24.7118 60.4943 24.7118 59.9177 25.2538L52.287 32.4272L75.2015 53.9683L82.8322 46.7949C83.4088 46.2529 83.4088 45.374 82.8322 44.8319Z"
                                fill="white"
                              />
                            </svg>
                          </div>

                          <div className="name w-10/12">
                            <p className="tickets-types">{ev.para}</p>
                            <div className="flex justify-between">
                              <div className="flex-col flex">
                                {ev.showRemainingCount ? (
                                  <small
                                    className="text-color"
                                    style={{ color: "#13B497" }}
                                  >
                                    Remaining tickets will be displayed on UI
                                  </small>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>

                          <div
                            style={{ color: "#fff" }}
                            className="ml-2 cursor-pointer flex items-center"
                            onClick={() => removeGuest(ev)}
                          >
                            {/* <small className="text-color">${ev.amount}</small> */}
                            <AiOutlineDelete className="w-5 h-5 ml-1" />
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}

                <div>
                  {showGuestForm ? (
                    <div className="flex py-5">
                      <div className="name w-full ticketForm">
                        {/* <textarea
                          className="textarea"
                          value={newTicket.event}
                          placeholder="Description of ticket type"
                          onChange={(e) =>
                            handleTicketChange("event", e.target.value)
                          }
                        /> */}

                        <textarea
                          className="textarea mt-5"
                          rows={4}
                          placeholder="Guest List"
                          value={newGuest.para}
                          onChange={(e) =>
                            handleGuestChange("para", e.target.value)
                          }
                        />

                        <div className="">
                          <div className="flex justify-between">
                            <button
                              className="create-event-btn rounded-lg text-sm text-white text-center ticketsBtn"
                              disabled={!newGuest.para}
                              style={{
                                padding: "10px 20px",
                                marginTop: -3,
                                height: "38px",
                                width: "49%",
                              }}
                              onClick={() => handleAddGuest()}
                            >
                              Add Guest
                            </button>

                            <button
                              className="create-event-btn rounded-lg text-sm text-white text-center ticketsBtn"
                              style={{
                                background: "#979595",
                                padding: "10px 20px",
                                marginTop: -3,
                                height: "38px",
                                width: "49%",
                              }}
                              onClick={() => handleCancelGuest()}
                            >
                              Cancel Guest
                            </button>
                          </div>
                        </div>
                        <small className="text-color"></small>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="background-gray mt-5 flex items-center rounded-lg">
                <input
                  type="text"
                  className="address-input"
                  id="autocomplete"
                  height="80"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <img
                  src={`${router.basePath}/assets/images/location_icon.png`}
                  className="mr-3 h-4 w-4"
                  alt=""
                />
              </div>
              <button
                className="w-full flex justify-center items-center mt-5 rounded-lg text-white text-sm"
                style={{ backgroundColor: "#13b497", height: "42px" }}
                onClick={() => router.push("/hire-event-staff")}
              >
                Hire Event Staff
              </button>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="create-event-btn rounded-lg text-sm text-white text-center"
              onClick={handleFormSubmit}
              disabled={!eventTitle || !startDate || !endDate || !selectedCity}
            >
              {isLoading ? (
                <AppLoader />
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>

            <button
              className="create-event-btn rounded-lg text-sm text-white text-center ml-5 cancel-eventBtn"
              onClick={() => router.push("/dashboard")}
              style={{ background: "#979595" }}
            >
              Cancel Event
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
