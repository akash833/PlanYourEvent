import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import { useRouter } from "next/router";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import AppLoader from "./components/utility/loader";
import moment from "moment";
import Swal from "sweetalert2";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import EventStaffDetails from "./event-sttaff-details";
import Layout from "./components/layout";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  ResponsiveContainer,
  AreaChart,
 
  Tooltip,
  Area,
  Bar,
  BarChart,
} from "recharts";

const eventDetail = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  let objId = {
    orderId: {
      customerEmail: "",
      customerName: "",
      eventId: "",
    },
    quantity: 0,
  };

  let addMore = 10;
  const [eventData, setEventData] = useState<any>({});
  const [eventid, setEventid] = useState<any>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [visibleRecords, setVisibleRecords] = useState(addMore);
  const [ticketSold, setTicketSold] = useState(0);

  const [openQR, setOpenQR] = useState(false);
  const [scanId, setScanId] = useState<any>("");
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(objId);
  const [showDataLoader, setShowDataLoader] = useState(false);
  const [isArrived, setIsArrived] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [weeklyIncomeData, setWeeklyIncomeData] = useState([]);
  const [weeklyTicketsSales, setWeeklyTicketsSales] = useState([]);

  const getWeeklySalesData = async () => {
    const { data } = await CALL_GET_API("dashboard/getIncomeDetailsWeekly");
    setWeeklyIncomeData(data.data);
  };

  const getWeeklyTicketsSales = async () => {
    const { data } = await CALL_GET_API("dashboard/getWeeklyTicketsSales");
    setWeeklyTicketsSales(data.data);
  };

  useEffect(() => {
    getWeeklySalesData();
    getWeeklyTicketsSales();
  }, []);

  const fetchOrderData = async (_id: any) => {
    setShowDataLoader(true);
    const { success, data } = await CALL_GET_API(
      `public/get-event-by-order-id/${_id}`
    );

    if (success) {
      if (data.data.orderId.eventId !== eventId) {
        setShowDataLoader(false);
        setIsValid(false);
      } else {
        setOrderDetails(data.data);
        setIsArrived(data.data.arrived);
        setShowDataLoader(false);
        setShowDetails(true);
      }
    } else {
      console.log("Data is not fetch");
    }
  };

  useEffect(() => {
    let scanner: any = null;

    if (openQR) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 400,
            height: 400,
          },
          fps: 5,
        },
        true
      );

      scanner.render(onSuccess, onError);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [openQR]);

  function onSuccess(_id: any) {
    setOpenQR(false);
    setShowDataLoader(true);
    setScanId(_id);
    fetchOrderData(_id);
  }

  function onError(err: any) {
    console.warn(err);
  }

  // const handleQRCode = () => {
  //   setOpenQR(!openQR);
  // };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateCustomerArrived = async () => {
    const { success, data } = await CALL_POST_API("order/arrived", {
      _id: scanId,
      arrived: true,
    });

    if (success) {
      console.log(data);
    }
  };

  const handleProceedEvent = async () => {
    setShowDetails(false);
    updateCustomerArrived();
    const { success, data } = await CALL_POST_API("arrivedCustomer", {
      eventId: eventId,
      custName: orderDetails.orderId.customerName,
      email: orderDetails.orderId.customerEmail,
    });

    if (success) {
      console.log(data);
    }
  };

  const handleIsValid = () => {
    setIsValid(true);
  };

  // const handleArrivedCust = () => {
  //   router.push(`/arrived-list/?eventId=${eventId}`);
  // };

  // Number of records to show per page

  const handleCheckboxChange = async (e: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    console.log(eventId);
    const checked = e.target.checked;
    const updatedData = {
      isActive: checked,
      _id: eventId,
    };

    setEventData((prev: any) => {
      return { ...prev, isActive: checked };
    });
    const { success, data } = await CALL_POST_API(
      `events/update-isActive-eventById`,
      updatedData
    );

    if (checked) {
      Swal.fire({
        text: "Event is still open",
      });
    } else {
      Swal.fire({
        text: "Event is turned off",
      });
    }
    if (success) {
      console.log(data);
    }
  };

  const getEventById = async () => {
    setLoader(true);
    const { success, data } = await CALL_GET_API(
      `events/get-eventById?_id=${eventId}`
    );

    if (success) {
      setEventData(data.data);
      setEventid(eventId);
      const totalTicketSold = data.data.soldTickets;
      setTicketSold(totalTicketSold);
      console.log(ticketSold, "ticketSoldticketSold");
    } else {
      console.log(eventData);
    }

    // setLoader(false);
    setLoader(false);
  };

  const getOrderData = async () => {
    // setLoader(true);
    const body = {
      eventId: eventId,
    };
    const { success, data } = await CALL_POST_API("order/get-order-data", body);
    if (success) {
      setOrderData(data.data);
      console.log(data.data);
    }
    // setLoader(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const confirmDeleteEvent = async () => {
    closeDeleteModal();
    if (ticketSold >= 1) {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete Event",
        text: "You cannot delete because there are sold tickets.",
      });
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    const { success, data } = await CALL_POST_API(
      `events/delete-event?_id=${eventId}`,
      {}
    );
    if (success) {
      console.log(data);
      router.push("./events");
    }
  };

  const loadMore = () => {
    setShow(true);
    setVisibleRecords((prevVisibleRecords) => prevVisibleRecords + addMore);

    setShow(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    setEventId(eventId!);
    getEventById();
    getOrderData();
  }, [eventId]);

  // const getImage = (eventData: any) => {
  //   if (eventData.eventPhotosUrl && eventData.eventPhotosUrl[0]) {
  //     return eventData.eventPhotosUrl[0];
  //   } else {
  //     return "";
  //   }
  // };

  const getLink = () => {
    return process.env.NEXT_PUBLIC_APP_PATH + "event/?id=" + eventid;
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

  const getYear = () => {
    const now = moment(eventData.startTime);
    const year = now.format("YYYY");
    return year;
  };

  const getAmount = (tickets: any) => {
    if (tickets && tickets[0]) {
      const firstTicketAmount = tickets[0].amount;
      return firstTicketAmount;
    } else {
      return "";
    }
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const svgStyle = {
    fill: "white",
  };

  const router = useRouter();
  return (
    <Layout title="Event Details | Popup" description="Event Details | Popup">
      {loader ? (
        <div className="flex justify-center items-center h-full">
          <AppLoader />
        </div>
      ) : (
        <div>
          <Row>
            <Col md={9}>
              <div
                className="rounded-xl"
                style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
              >
                <Row>
                  <Col md={4} className="py-6">
                    {/* <img
                      className="pl-6 h-full"
                      src={getImage(eventData)}
                      alt=""
                    /> */}
                    <Carousel responsive={responsive}>
                      {(eventData?.eventPhotosUrl || []).map(
                        (photo: string) => {
                          return (
                            <img
                              className="danuaImage p-4"
                              style={{ marginTop: 0 }}
                              src={photo}
                            />
                          );
                        }
                      )}
                    </Carousel>
                  </Col>
                  <Col md={8} className=" py-6">
                    <div className="p-4">
                      <div className="text-white text-lg mb-2">
                        {eventData?.eventTitle}
                      </div>
                      <div className="flex mb-3 items-center gap-x-2">
                        <img
                          src={`${router.basePath}/assets/images/movie.png`}
                          alt=""
                          className="w-3 h-3"
                        />
                        <div
                          className="text-sm font-light"
                          style={{ color: "rgba(122, 244, 237, 1)" }}
                        >
                          {eventData?.eventTypeSubHeading}
                        </div>
                      </div>
                      <div className="text-white text-xs font-light">
                        {eventData?.eventDescription}
                      </div>

                      <div className="event-details-cards mr-6">
                        <div>
                          <div
                            className="font-Size font-light mb-1"
                            style={{ color: "rgba(255, 255, 255, 0.5)" }}
                          >
                            Copy below link and share to your network to
                            purchase ticket for this event
                          </div>
                          <div className="flex gap-x-0.5 items-center">
                            <div className="text-sm text-white">
                              <a target="_blank" href={getLink()}>
                                {getLink()}
                              </a>
                            </div>
                          </div>
                          {/* <div className="flex gap-x-2 mt-2">
                            <button
                              className="bg-[#13b497] flex items-center px-[1.75rem] py-[0.5rem] rounded-md gap-x-2 text-white text-xs"
                              onClick={handleQRCode}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                viewBox="0 -960 960 960"
                                width="20"
                                style={svgStyle}
                              >
                                <path d="M80-680v-200h200v80H160v120H80Zm0 600v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680Zm120-600v-120H680v-80h200v200h-80ZM700-260h60v60h-60v-60Zm0-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm120-120h60v60h-60v-60Zm-60 60h60v60h-60v-60Zm-60-60h60v60h-60v-60Zm240-320v240H520v-240h240ZM440-440v240H200v-240h240Zm0-320v240H200v-240h240Zm-60 500v-120H260v120h120Zm0-320v-120H260v120h120Zm320 0v-120H580v120h120Z" />
                              </svg>
                              Scan QR
                            </button>
                            <button
                              className="bg-[#13b497] px-[1.75rem] py-[0.5rem] rounded-md text-white text-xs"
                              onClick={handleArrivedCust}
                            >
                              Arrived Guest
                            </button>
                          </div> */}
                          <div>
                            {/* Qr Code */}
                            {openQR && (
                              <div className="details-model-overlay">
                                <div className="details-model">
                                  <div className="flex justify-between mb-2">
                                    <p className="text-center">
                                      Scan your QR code
                                    </p>
                                    <button
                                      type="button"
                                      className="self-end mt-2 md:mt-0"
                                      onClick={() => setOpenQR(false)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24"
                                        viewBox="0 -960 960 960"
                                        width="24"
                                        style={svgStyle}
                                        className="fill-current text-white"
                                      >
                                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                                      </svg>
                                    </button>
                                  </div>
                                  <div id="reader"></div>
                                </div>
                              </div>
                            )}

                            {/* show loader */}

                            {showDataLoader && (
                              <div className="details-model-overlay">
                                <div className="details-model flex justify-center items-center p-40">
                                  <div className="spinner-border"></div>
                                </div>
                              </div>
                            )}

                            {/* show details */}

                            {showDetails && isValid && (
                              <div className="details-model-overlay">
                                <div className="details-model">
                                  {!isArrived ? (
                                    <div className="wrapper">
                                      <svg
                                        className="checkmark success"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 52 52"
                                      >
                                        <circle
                                          className="checkmark_circle_success"
                                          cx="26"
                                          cy="26"
                                          r="25"
                                          fill="none"
                                        ></circle>
                                        <path
                                          className="checkmark_check"
                                          fill="none"
                                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                          stroke-linecap="round"
                                        ></path>
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="wrapper">
                                      <svg
                                        className="checkmark error"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 52 52"
                                      >
                                        <circle
                                          className="checkmark_circle_error"
                                          cx="26"
                                          cy="26"
                                          r="25"
                                          fill="none"
                                        />
                                        <path
                                          className="checkmark_check"
                                          stroke-linecap="round"
                                          fill="none"
                                          d="M16 16 36 36 M36 16 16 36"
                                        />
                                      </svg>
                                      <p className="flex justify-center text-[#FF4444] mt-2">
                                        Already arrived
                                      </p>
                                    </div>
                                  )}
                                  <div className="my-[20px]">
                                    <div className="text-2xl font-bold text-center mb-2">
                                      {orderDetails.orderId.customerName}
                                    </div>
                                    <div className="text-1xl font-bold text-center my-2">
                                      Tickets - {orderDetails.quantity}
                                    </div>
                                    <div className="text-rgba(107, 114, 128, 1) text-center my-2">
                                      {orderDetails.orderId.customerEmail}
                                    </div>
                                  </div>

                                  {!isArrived ? (
                                    <div className="flex justify-between">
                                      <button
                                        className=" text-xs mr-2 bg-[#13b497] rounded-md p-2 text-white"
                                        onClick={handleProceedEvent}
                                      >
                                        Proceed Event
                                      </button>
                                      <button
                                        className="bg-[#13b497] text-xs  rounded-md px-8 py-2 text-white"
                                        onClick={handleShowDetails}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex justify-center">
                                      <button
                                        className="bg-[#13b497] text-xs  rounded-md px-8 py-2 text-white"
                                        onClick={handleShowDetails}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {!isValid && (
                              <div className="details-model-overlay">
                                <div className="details-model">
                                  <div className="wrapper">
                                    <svg
                                      className="checkmark error"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 52 52"
                                    >
                                      <circle
                                        className="checkmark_circle_error"
                                        cx="26"
                                        cy="26"
                                        r="25"
                                        fill="none"
                                      />
                                      <path
                                        className="checkmark_check"
                                        stroke-linecap="round"
                                        fill="none"
                                        d="M16 16 36 36 M36 16 16 36"
                                      />
                                    </svg>
                                    <p className="flex justify-center text-[#FF4444] py-2">
                                      Event not valid
                                    </p>
                                  </div>
                                  <div className="flex justify-center">
                                    <button
                                      className="bg-[#13b497] text-xs  rounded-md px-8 py-2 text-white"
                                      onClick={handleIsValid}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <div
                    className=" my-3"
                    style={{
                      border: "1px solid",
                      width: "100%",
                      margin: "0 15px",
                    }}
                  ></div>
                  <Col md={3}>
                    <div className="event-details-cards ml-6">
                      <img
                        src={`${router.basePath}/assets/images/doller.png`}
                        alt=""
                        className="w-3"
                      />
                      <div>
                        <div
                          className="font-Size font-light mb-1"
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                          Ticket Price
                        </div>
                        <div className="flex gap-x-0.5 items-center">
                          <div className="text-xs text-white">
                            {getAmount(eventData.ticket)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="event-details-cards">
                      <img
                        src={`${router.basePath}/assets/images/calender_pop.png`}
                        alt=""
                        className="w-5 h-5"
                      />
                      <div>
                        <div
                          className="font-Size font-light mb-1"
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                          Date
                        </div>
                        <div className="flex gap-x-0.5 items-center">
                          <div className="text-xs text-white">
                            {getDay()}, {getDate()} {getMonth()} {getYear()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="event-details-cards mr-6">
                      <img
                        src={`${router.basePath}/assets/images/location.png`}
                        alt=""
                        className="w-6 h-6"
                      />
                      <div>
                        <div
                          className="font-Size font-light mb-1"
                          style={{ color: "rgba(255, 255, 255, 0.5)" }}
                        >
                          Location
                        </div>
                        <div className="flex gap-x-0.5 items-center">
                          <div className="text-xs text-white">
                            {eventData?.city}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col md={4}>
                    <div className="flex revenue relative">
                      <div className="px-4 w-1/2 flex justify-center flex-col">
                        <h6 className="ticketTitle">Revenue</h6>
                        <h4 className="ticketRate text-white">
                          ${eventData.totalRevenue}
                        </h4>
                      </div>
                      {/* <div className="w-1/2 px-1 flex items-end">
                        <img
                          src={`${router.basePath}/assets/images/lines.png`}
                          className="h-20 object-cover"
                        />
                      </div> */}
                      <ResponsiveContainer width="50%" height={125}>
                        <BarChart
                          data={weeklyIncomeData}
                          margin={{ right: 10 }}
                        >
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "#000",
                                      background: "white",
                                      textAlign: "center",
                                      padding: "3px",
                                    }}
                                  >
                                    <span>{payload[0]?.payload.day}</span>{" "}
                                    <br />
                                    <span>Income: {payload[0]?.value}</span>
                                  </p>
                                );
                              }
                              return null;
                            }}
                            wrapperStyle={{ width: 100 }}
                          />
                          <Bar dataKey="income" fill="#13B497" barSize={8} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="flex revenue relative">
                      <div className="px-4 flex justify-center flex-col">
                        <h6 className="ticketTitle">Total Ticket Sales</h6>
                        <h4 className="ticketRate text-white">
                          {eventData.soldTickets}
                        </h4>
                      </div>
                      <ResponsiveContainer width="100%" height={125}>
                        <AreaChart
                          data={weeklyTicketsSales}
                          margin={{right:10,top:20}}
                        >
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "#000",
                                      background: "white",
                                      textAlign: "center",
                                      padding: "3px",
                                    }}
                                  >
                                    <span>{payload[0]?.payload.day}</span>{" "}
                                    <br />
                                    <span>Income: {payload[0]?.value}</span>
                                  </p>
                                );
                              }
                              return null;
                            }}
                            wrapperStyle={{ width: 100 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="tickets"
                            fill="#13B497"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="flex revenue unsold relative">
                      <div className="px-4 flex justify-center flex-col">
                        <h6 className="ticketTitle">Unsold Tickets</h6>
                        <h4 className="ticketRate text-white">
                          {eventData.unsoldTickets} Left
                        </h4>
                      </div>
                      <div
                        className="absolute"
                        style={{ right: "0", bottom: "0", width: "35%" }}
                      >
                        <img
                          src={`${router.basePath}/assets/images/dollersing.png`}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-5">
                <h4 className="text-white">Recent sales</h4>
              </div>

              <div>
                <div className="mt-8 event-main-table">
                  <div className="hire-header">
                    <div>Order ID</div>
                    <div>Date</div>
                    <div>Customer Name</div>
                    <div className="">Sold Ticket</div>
                  </div>

                  <div style={{ display: "block" }}>
                    <div>
                      {orderData.length === 0 ? (
                        <div className="text-center text-white text-xs mt-5">
                          No sales has taken place yet
                        </div>
                      ) : (
                        <div>
                          {orderData.slice(0, visibleRecords).map((e: any) => (
                            <div className="hire-header hire-header-child orderTable">
                              <div>{e.orderId}</div>
                              <div>
                                {formatDate(e.createdAt)} <br />{" "}
                              </div>
                              <div className="">{e.customerName}</div>
                             
                              <div className="">{e.quantity} Pcs</div>
                            </div>
                          ))}

                          {visibleRecords < orderData.length && (
                            <div className="hire-header hire-header-child tableButton">
                              <button
                                onClick={loadMore}
                                className="create-event-btn rounded-lg text-sm text-white text-center"
                              >
                                {show ? (
                                  <>
                                    <AppLoader />
                                  </>
                                ) : (
                                  <> Load More</>
                                )}
                              </button>
                            </div>
                          )}

                          {/* <div className="hire-header hire-header-child tableButton">
                            <button
                              className="create-event-btn rounded-lg text-sm text-white text-center"
                              onClick={loadMore}
                            >
                              {show ? (
                                <>
                                  <AppLoader />
                                </>
                              ) : (
                                <> Load More</>
                              )}
                            </button>
                          </div> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="flex available">
                <div>
                  <h5 className="ticketAbail">Available Tickets</h5>
                  <h4 className="digitLeft">{eventData.unsoldTickets} Left</h4>
                </div>
                <div>
                  <img
                    className="dollerSing"
                    src={`${router.basePath}/assets/images/dollersing.png`}
                  />
                </div>
              </div>

              <div className="galleries">
                <h4>Event Galleries</h4>
              </div>

              <div>
                <Carousel responsive={responsive}>
                  {(eventData?.eventPhotosUrl || []).map((photo: string) => {
                    return <img className="danuaImage" src={photo} />;
                  })}
                </Carousel>
              </div>
            </Col>
          </Row>

          <EventStaffDetails />

          <Row style={{marginTop:"20px"}}>
            <Col md={4} style={{ textAlign: "end" }}>
              <button
                className="create-event-btn  text-sm text-white text-center rounded"
                style={{ background: "rgba(52, 60, 68, 1)" }}
              >
                <div className="flex items-center justify-center gap-x-3.5">
                  <input
                    type="checkbox"
                    checked={eventData.isActive}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <div className="text-sm text-white">Active</div>
                </div>
              </button>
            </Col>
            <Col md={4} style={{ textAlign: "center" }}>
              <button
                className="create-event-btn text-sm text-white text-center rounded"
                style={{ background: "rgba(208, 116, 7, 1)" }}
                onClick={() => router.push(`/newevent?id=${eventData._id}`)}
              >
                Edit
              </button>
            </Col>
            <Col md={4}>
              <button
                className="create-event-btn  text-sm text-white text-center rounded"
                style={{ background: "rgba(166, 28, 28, 1)" }}
                onClick={openDeleteModal}
              >
                <div className="text-sm text-white">Delete</div>
              </button>
            </Col>
          </Row>
          {showDeleteModal && (
            <div className="delete-modal-overlay">
              <div className="delete-modal-event">
                <p>Are you sure you want to delete this event?</p>
                <div className="delete-modal-buttons">
                  <button
                    className="delete-modal-yes-event text-xs"
                    onClick={confirmDeleteEvent}
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    className="delete-modal-no-event text-xs"
                    onClick={closeDeleteModal}
                  >
                    No, Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default eventDetail;
