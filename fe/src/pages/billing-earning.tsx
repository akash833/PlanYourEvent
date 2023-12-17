import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import { useRouter } from "next/router";
import { CALL_GET_API, CALL_POST_API } from "@/api";
import AppLoader from "./components/utility/loader";

const Billing = () => {
  const router = useRouter();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  let end_date: any = `${year}-${month}-${day}`;

  const [allEvents, setAllEvents] = useState<any>([]);
  const [allFilteredEvents, setAllFilteredEvents] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("");
  const [eventData, setEventData] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const [divLoader, setDivLoader] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState<any>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(end_date);
  const [futureDateNew, setFutureDate] = useState<string>("");
  const [eventID, setEventId] = useState("");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];
  // const [showLoadMore, setshowLoadMore] = useState(false);
  // const [showLoadMoreLoader, setshowLoadMoreLoader] = useState(false);
  const [noEventsMsg, setNoEventsMsg] = useState(true);
  const popupEventFee = 3;
  const ticketSaleFee = 5;

  // const [pageNum, setPageNum] = useState(1);
  const showPerPage = 10;

  const [showRightSideDiv, setShowRightSideDiv] = useState(false);

  const getEventById = async (eventId: any) => {
    setLoader(true);
    setEventId(eventId);
    const body = {
      _id: eventId,
      startDate: startDate,
      endDate: endDate,
    };
    const { success, data } = await CALL_POST_API(
      "events/get-eventById-filterDateRange",
      body
    );
    if (success) {
      setEventData(data.data);
      setTotalRevenue(data.data.totalRevenue);
    } else {
      console.log(
        eventData,
        eventID,
        // setshowLoadMore,
        // setshowLoadMoreLoader,
        showPerPage
      );
    }
    setLoader(false);
    console.log(setFutureDate);
  };

  const getEvents = async () => {
    setDivLoader(true);
    try {
      const { success, data } = await CALL_GET_API(
        "events/get-event-without-pagination"
      );

      if (success) {
        if (data.data.length > 0) {
          const allEvents = data.data;
          const firstEvent = allEvents[0];
          setActiveTab(firstEvent.eventTitle);
          getEventById(firstEvent._id);
          console.log(allEvents);
          setAllFilteredEvents(allEvents);
          setAllEvents(allEvents);
          setDivLoader(false);
          setNoEventsMsg(false);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setDivLoader(false);
  };

  const getFilterData = async () => {
    const myFilteredEvent = filteredEvents;
    setAllFilteredEvents(myFilteredEvent);
    console.log(myFilteredEvent);
    if (myFilteredEvent.length > 0) {
      const firstEvent = myFilteredEvent[0];
      setActiveTab(firstEvent.eventTitle);
      getEventById(firstEvent._id);
    }
  };

  const filteredEvents = allEvents.filter((event: any) => {
    const eventDate = event.startTime.split("T")[0];
    return eventDate >= startDate && eventDate <= endDate;
  });

  useEffect(() => {
    getEvents();
  }, []);

  // const handleLoadMoreClick = () => {
  //   setPageNum(pageNum + 1);
  // };

  const headerLinks = async (e: any) => {
    setShowRightSideDiv(true);
    setActiveTab(e.eventTitle);
    // const startDate: any = new Date(e.createdAt);

    // start_date = startDate;

    getEventById(e._id);
    // creatEventTime = e.createdAt;
    // const endDate: any = new Date();

    // setStartDate(startDate);
    // setEndDate(endDate);
  };

  const getPopupEventFee = (totalRevenue: any) => {
    if (totalRevenue) {
      const num = (totalRevenue * popupEventFee) / 100;
      const amount = Math.ceil(num);
      return amount;
    }else return 0;
  }


  const getTicketSaleFee = (totalRevenue: any) => {
    if (totalRevenue) {
      const num = (totalRevenue * ticketSaleFee) / 100;
      const amount = Math.ceil(num);
      return amount;
    }else return 0;
  }

  // useEffect(()=> {

  // }, [startDate, endDate])

  // const getAmount = (tickets: any) => {
  //   debugger
  //   if (tickets && tickets[0]) {
  //     const firstTicketAmount = tickets[0].amount;
  //     return firstTicketAmount;
  //   } else {
  //     return "";
  //   }
  // };

  const ticketSalesHeadingStyles = {
    fontFamily: "Poppins",
    fontSize: "19px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    color: "#FFFFFF",
    marginLeft: "50px",
  };

  return (
    <Layout
      title="Billing/Earnings | Popup"
      description="Billing/Earnings | Popup"
    >
      <div className="outerDivStyles relative">
        {divLoader ? (
          <>
            <div
              className="flex justify-center items-center h-full"
            >
              <AppLoader />
            </div>
          </>
        ) : noEventsMsg ? (
          <>
            <div className="text-white flex justify-center h-full items-center">
              There are No Events
            </div>
          </>
        ) : (
          <div className="billingEarningDiv">
            <div className="innerDivStyles">
              <div className="flex justify-between dateTimefix">
                <input
                  type="date"
                  placeholder="Start/End date & time"
                  // value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="start-date"
                  min={`${tomorrowDate}T00:00`}
                  style={{
                    width: "49%",
                    background: "transparent",
                    border: "1px solid gray",
                    textTransform: "uppercase",
                  }}
                />
                <input
                  type="date"
                  placeholder="Start/End date & time"
                  // value={endDate}
                  min={`${futureDateNew}T00:00`}
                  onChange={(e) => setEndDate(e.target.value)}
                  // onClick={endDateFunction}
                  style={{
                    width: "49%",
                    background: "transparent",
                    border: "1px solid gray",
                    textTransform: "uppercase",
                  }}
                // disabled={!startDate}
                />
                <button className="filter-btn" onClick={() => getFilterData()}>
                  Filter
                </button>

                {/* {startDate}, {endDate} */}
              </div>
              <button
                className="filter-btn ledger-btn"
                onClick={() => router.push("/transactions")}
              >
                Ledger
              </button>
            </div>
            {allFilteredEvents.length === 0 ? (
              <>
                <div className="text-white flex justify-center h-[50vh] items-center">
                  There are No Events in this Filter
                </div>
              </>
            ) : (
              <>
                <div className="eventListStyles">
                  <div
                    className={`leftSideStyles ${!showRightSideDiv ? "showLeftDiv" : "hideLeftDiv"
                      }`}
                  >
                    {allFilteredEvents.map((e: any) => (
                      <div
                        onClick={() => headerLinks(e)}
                        className={`tab cursor-pointer addEventsPadding ${activeTab === e.eventTitle ? "activeRightB" : ""
                          }`}
                      >
                        <div className="eventItemStyles">{e.eventTitle}</div>
                        <div className="text-sm font-light text-white">
                          $ {e.totalRevenue}
                        </div>
                      </div>
                    ))}
                    {/* {showLoadMore && (
                      <div
                        className="cursor-pointer my-2"
                        style={{
                          marginLeft: "25px",
                          color: "rgba(19, 180, 151, 1)",
                        }}
                        onClick={handleLoadMoreClick}
                      >
                        {showLoadMoreLoader ? (
                          <div style={{ marginLeft: "25px" }}>
                            <AppLoader />
                          </div>
                        ) : (
                          <span>Load More...</span>
                        )}
                      </div>
                    )} */}
                  </div>
                  <div
                    className={`rightSideStyles relative ${showRightSideDiv ? "showRightDiv" : "hideRightDiv"
                      }`}
                  >
                    {loader ? (
                      <></>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowRightSideDiv(false)}
                          className="leftArrow"
                        >
                          <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                          </svg>
                        </button>
                        <div>
                          <div style={ticketSalesHeadingStyles}>
                            {/* Ticket Sales {totalRevenue} */}
                          </div>
                          <div className="ticketCountStyles">
                            {eventData?.soldTickets}
                          </div>
                          <div className="ticketsSoldStyles">tickets sold</div>
                          <div className="gross-revenue-styles">
                            <div>Gross Revenue From Event Ticket Sales</div>
                            <div>${eventData.totalRevenue}</div>
                          </div>
                        </div>
                        <div
                          style={{
                            borderBottom: "1px solid",
                          }}
                        >
                          <div className="popup-event-fee-styles">
                            <div>Popup Event Fee ({popupEventFee}%)</div>
                            <div id="popupEventFee">
                              -${getPopupEventFee(totalRevenue)}

                            </div>
                          </div>
                          <div className="popup-event-fee-styles">
                            <div>Ticket Sale Fee ({ticketSaleFee}%)</div>
                            <div id="ticketSaleFee">
                              -${getTicketSaleFee(totalRevenue)}
                            </div>
                          </div>
                        </div>
                        <div className="net-earnings-container-styles">
                          <div className="net-earnings-text-styles">
                            Net Earnings
                          </div>
                          <div
                            style={{
                              color: "#27B89E",
                              fontSize: "18px",
                            }}
                          >
                            ${totalRevenue -(getPopupEventFee(totalRevenue) + getTicketSaleFee(totalRevenue))}
                            {/* {totalRevenue -
                              ((totalRevenue * popupEventFee) / 100 +
                                (totalRevenue * ticketSaleFee) / 100)} */}
                          </div>
                        </div>
                        <div
                          className="flex paypal-btn justify-center items-center mt-5"
                          style={{ marginLeft: 50 }}
                        >
                          <img
                            src={`${router.basePath}/assets/images/paypal.png`}
                            className="w-4 h-4 mr-2"
                            alt=""
                          />
                          <div className="text-black text-lg">
                            Withdraw Payment
                          </div>
                        </div>
                      </>
                    )}

                    <div style={{ display: loader ? "block" : "none" }}>
                      <div
                        className="flex justify-center items-center absolute"
                        style={{ top: "50%", left: "50%" }}
                      >
                        <AppLoader />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Billing;
