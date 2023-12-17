import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import moment from "moment";
import AppLoader from "./components/utility/loader";
import { isValidEmail } from "@/utils/validator";
import { FiHome } from "react-icons/fi";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

interface UserData {
  user_name: string;
  image: string;
}

const Event = () => {
  const [eventData, setEventData] = useState<any>({});
  const [eventId, setEventId] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    user_name: "",
    image: "",
  });
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [ticketsQuantity, setTicketsQuantity] = useState("1");
  const [ticketID, setTicketID] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [remainingTicket, setRemainingTicket] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageDesc, setPageDesc] = useState("");
  const [loader, setLoader] = useState(false);
  const [eventTickets, setEventTickets] = useState('');

  const router = useRouter();
  console.log(router.query.slug);
  const closeBuyTicketModal = async () => {
    setShowBuyNowModal(false);console.log(eventTickets)
  };

  const handleBlur = () => {
    setIsValid(isValidEmail(customerEmail));
  };

  const buyTicketModal = async (ticketId: any, remainingTicket: any) => {
    setShowBuyNowModal(true);
    setTicketID(ticketId);
    setRemainingTicket(remainingTicket);
  };

  const buyTickets = async () => {
    setIsLoader(true);
    const body = {
      customerName: customerName,
      customerEmail: customerEmail,
      ticketId: ticketID,
      eventId: eventId,
      quantity: ticketsQuantity,
    };
    const { success, data } = await CALL_POST_API(
      "public/generate-payment-link",
      body
    );
    if (success) {
      console.log(data);
      window.open(data.data, "_blank");
    }
    setIsLoader(false);
    closeBuyTicketModal();
  };

  const getEventDetails = async (eventId: string) => {
    setLoader(true);
    const { success, data } = await CALL_GET_API(
      `public/get-publicEvent-details?_id=${eventId}`
    );

    if (success) {
      const event = await data.data.eventData;
      const user = await data.data.user;
      setEventData(event[0]);
      setEventTickets(event[0].ticket);
      setPageTitle(event[0].eventTitle + " | Popup");
      setPageDesc(event[0].eventDescription);
      setUserData(user);
    } else {
      console.log(eventData);
    }
    setLoader(false);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    //const eventId:  any = router.query.slug; //urlParams.get("id");
    const eventId = urlParams.get("id");
    if (eventId) {
      setEventId(eventId);
      getEventDetails(eventId);
    }
  }, []);

  const getStartTime = () => {
    const now = moment(eventData.startTime);
    const formattedDate = now.format("HH:mm A");
    const [hour, minute] = formattedDate.split(":");
    const date = new Date(0, 0, 0, parseInt(hour!), parseInt(minute!));
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    }).format(date);
    return formattedTime;
  };

  const getEndTime = () => {
    const now = moment(eventData.endTime);
    const formattedDate = now.format("HH:mm A");
    const [hour, minute] = formattedDate.split(":");
    const date = new Date(0, 0, 0, parseInt(hour!), parseInt(minute!));
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: true,
    }).format(date);
    return formattedTime;
  };

  const getImage = (eventData: any) => {
    if (eventData.eventPhotosUrl && eventData.eventPhotosUrl[0]) {
      return eventData.eventPhotosUrl[0];
    } else {
      return "";
    }
  };

  const getDay = () => {
    const now = moment(eventData.startTime);
    const dayOfWeek = now.format("dddd");
    return dayOfWeek;
  };

  const getDate = () => {
    const now = moment(eventData.startTime);
    const dayOfMonth = now.format("D");
    return dayOfMonth;
  };
  const getMonth = () => {
    const now = moment(eventData.startTime);
    const monthName = now.format("MMMM");
    return monthName;
  };

  return (
    <Main meta={<Meta title={pageTitle} description={pageDesc} />}>
      <div>
        <div className="mac-book-pro-16-1">
          {loader ? (
            <div className="flex justify-center items-center h-full">
              <AppLoader />
            </div>
          ) : (
            <>
              {eventData.isActive ? (
                <div>
                  <div>
                    <img
                      className="pop-up-img"
                      src={`${router.basePath}/assets/images/popupTitle.png`}
                    />
                  </div>
                  <div className="eventMainDiv">
                    <div className="event-Details">
                      <div>
                        <div className="ticketHead text-dark poppinsFont font-extrabold mb-2">
                          {eventData.eventTitle}
                        </div>
                        <div className="rave-music poppinsFont">
                          {eventData.eventTypeSubHeading}
                        </div>
                        <div className="RightSideEvent forMobile">
                          <div>
                            <img
                              className="w-full h-11/12 eventImage"
                              src={getImage(eventData)}
                              alt=""
                            />
                          </div>
                          <div
                            className="flex flex-row gap-2 items-center"
                            style={{ marginTop: "1rem" }}
                          >
                            <div>
                              <FiHome style={{ color: "red" }} />
                            </div>
                            <div className="hosted-by">Hosted By</div>
                            <div className="jane-doe">
                              @{userData.user_name}
                            </div>
                            <img
                              className="hostedByImg"
                              style={{ width: "38px", height: "38px" }}
                              src={userData.image}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col my-7">
                        <div className="friday-may-16th">
                          {getDay()}, {getMonth()} {getDate()}th{" "}
                        </div>
                        <div className="eventTime my-2 mb-0">
                          {getStartTime()} - {getEndTime()}
                        </div>
                        {eventData.eventType == "Private" ? (
                          <></>
                        ) : (
                          <div className="eventTime mb-5">{eventData.city}</div>
                        )}

                        <div className="public-event">
                          <div className="flex flex-row gap-3 items-center mt-5">
                            <div className="public-event-span">🌎</div>
                            <div className="public-event-span2">
                              {eventData.eventType}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                      <div
                        className="flex flex-col"
                        style={{ marginTop: "2rem" }}
                      >
                        {eventData.eventType == "Private" ? (
                          <></>
                        ) : (
                          <>
                            <div className="ticket-types-prices mb-7">
                              Ticket Types &amp; Prices
                            </div>
                            {eventData.ticket &&
                              eventData.ticket.map((item: any) => (
                                <div className="flex flex-col" key={item._id}>
                                  <div className="ticketsRowDiv">
                                    <div className="flex gap-5 items-center">
                                      <div className="">
                                        {item.remainingTickets === 0 ||
                                        item.remainingTickets < 0 ? (
                                          <div className="w-14 h-14">
                                            <img
                                              src={`${router.basePath}/assets/images/soldout-text1.png`}
                                              alt=""
                                              className="pt-3"
                                            />
                                          </div>
                                        ) : (
                                          <div className="ticketPriceDiv w-14 h-14 poppinsFont">
                                            ${item.amount}
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="text-sm text-dark font-semibold poppinsFont">
                                          {item.name}
                                        </div>

                                        {item.showRemainingCount ? (
                                          <div className="_20-tickets-remaining poppinsFont text-sm">
                                            {item.remainingTickets} Tickets
                                            Remaining
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div className="allows-you-general-access-into-the-event poppinsFont text-sm">
                                          {item.event}
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      className="buy-now poppinsFont"
                                      onClick={() =>
                                        buyTicketModal(
                                          item._id,
                                          item.remainingTickets
                                        )
                                      }
                                      disabled={
                                        item.remainingTickets === 0 ||
                                        item.remainingTickets < 0
                                      }
                                    >
                                      <div className="text-sm text-white w-max">
                                        Buy Now!
                                      </div>
                                    </button>
                                  </div>
                                  <div className="border-bot"></div>
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col h-full  w-2/5 items-center justify-items-center RightSideEvent">
                      <div
                        style={{
                          position: "fixed",
                          top: "10vh",
                          right: "10vh",
                        }}
                      >
                        <img
                          className="w-full h-11/12 eventImage"
                          src={getImage(eventData)}
                          alt=""
                        />
                        <div
                          className="flex flex-row gap-2 justify-center"
                          style={{ marginTop: "1rem" }}
                        >
                          <FiHome style={{width:'30px', height:'30px'}}/>
                          <div className="hosted-by">Hosted By</div>
                          <div className="jane-doe">@{userData.user_name}</div>
                          <img className="hostedByImg" src={userData.image} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-2xl">
                  No Event Found
                </div>
              )}
            </>
          )}
        </div>
        {showBuyNowModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="text-xl text-dark poppinsFont my-4 mt-0 font-bold">
                Purchase A Ticket
              </div>
              <label htmlFor="" className="text-sm text-dark poppinsFont">
                Your Full Name
              </label>
              <input
                onChange={(e) => setCustomerName(e.target.value)}
                className="buyNowInput poppinsFont"
                type="text"
                // placeholder="Couster Name"
              />
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="" className="text-sm text-dark poppinsFont">
                  Your Email
                </label>
                <input
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="buyNowInput poppinsFont"
                  style={{ marginBottom: "0px" }}
                  type="text"
                  // placeholder="Customer Email"
                  onBlur={handleBlur}
                />
                {isValid ? null : (
                  <div className="wrong-msg-div">
                    <p className="wrong-msg text-left poppinsFont">
                      Enter valid email
                    </p>
                  </div>
                )}
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label htmlFor="" className="text-sm text-dark poppinsFont">
                  How Many Tickets?
                </label>
                <input
                  onChange={(e) => setTicketsQuantity(e.target.value)}
                  className="buyNowInput poppinsFont"
                  style={{ marginBottom: "0px" }}
                  type="number"
                  value={ticketsQuantity}
                  placeholder="Tickets Number"
                />
                {remainingTicket >= ticketsQuantity ? (
                  <></>
                ) : (
                  <div className="wrong-msg-div">
                    <p className="wrong-msg text-left poppinsFont">
                      You can not buy more than {remainingTicket} tickets
                    </p>
                  </div>
                )}
              </div>
              <div className="delete-modal-buttons">
                <button
                  disabled={
                    !ticketsQuantity ||
                    !customerEmail ||
                    !customerName ||
                    !(remainingTicket >= ticketsQuantity)
                  }
                  className="delete-modal-yes text-xs poppinsFont"
                  style={{ background: "#13b497" }}
                  onClick={buyTickets}
                >
                  {isLoader ? <AppLoader /> : "Buy Now!"}
                </button>
                <button
                  className="delete-modal-no text-xs poppinsFont"
                  onClick={closeBuyTicketModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Event;
