import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CALL_GET_API } from "@/api";
import moment from "moment";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import AppLoader from "./components/utility/loader";

const TicketConform = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>({});
  const [eventData, setEventdata] = useState<any>({});
  const [pageTitle, setPageTitle] = useState("");
  const [pageDesc, setPageDesc] = useState("");
  const [loader, setLoader] = useState(false);
  const [qrimage, setQrimage] = useState("");

  const getOrderData = async (orderId: any) => {
    setLoader(true);
    const { success, data } = await CALL_GET_API(
      `public/get-event-by-order-id/${orderId}`
    );
    if (success) {
      setOrderData(data.data);
      setEventdata(data.data.eventId);
      setPageTitle(data.data.eventId.eventTitle + " | Popup");
      setPageDesc(data.data.eventId.eventDescription);
      setQrimage(data.data.orderId.qrUrl)
    }
    setLoader(false);
  };

  const user = async () => {
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        setUserDetails(data.data);
        console.log(userDetails);
      }
    } catch (err) {}
  };

  const getDay = () => {
    const now = moment(eventData.startTime);
    const dayOfWeek = now.format("dddd");
    return dayOfWeek; // Day of the week in string format
  };

  const getDate = () => {
    const now = moment(eventData.startTime);
    const dayOfMonth = now.format("D");
    return dayOfMonth; // Day of the month as a number
  };
  const getMonth = () => {
    const now = moment(eventData.startTime);
    const monthName = now.format("MMMM");
    return monthName; // Month name in string format
  };

  const getImage = (eventData: any) => {
    if (eventData.eventPhotosUrl && eventData.eventPhotosUrl[0]) {
      return eventData.eventPhotosUrl[0];
    } else {
      return "";
    }
  };

  const getStartTime = () => {
    const now = moment(eventData.startTime);
    const formattedDate = now.format("HH:mm A");
    // return formattedDate;
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

   console.log("qrimage qrimage =>", qrimage);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    getOrderData(orderId);
    user();
  }, []);
  return (
    <Main meta={<Meta title={pageTitle} description={pageDesc} />}>
      <div className="mac-book-pro-16-1">
        {loader ? (
          <div className="flex justify-center items-center h-full">
            <AppLoader />
          </div>
        ) : (
          <>
            <div>
              <img
                className="pop-up-img"
                src={`${router.basePath}/assets/images/popupTitle.png`}
              />
            </div>
            <div className="flex flex-col mainDivTicketConfirm">
              <div className="flex flex-col w-full  h-full  justify-evenly  items-center">
                <div className="flex flex-col  w-9/12  pb-5">
                  <div className="flex flex-col justify-center">
                    <div className="text_Data text-dark poppinsFont font-bold">
                      Thanks!
                    </div>
                    <div className="flex flex-row gap-5 items-center">
                      <div className="text-dark text-2xl poppinsFont font-bold">
                        Your order has been confirmed
                      </div>
                      <img
                        className="tick-image"
                        src={`${router.basePath}/assets/images/Eo_circle_green_white_checkmark 1.png`}
                      />
                    </div>
                  </div>

                  <div className="you-will-need-to-show-your-ticket-at-the-door-we-will-also-email-you-your-ticket-confirmation">
                    You will need to show your ticket at the door.
                    <br />
                    We will also email you your ticket confirmation.
                  </div>
                </div>

                <div className="eventTicketDiv">
                  <div className="rectangle-46">
                    <div className="card-body">
                      <div>
                        <div className="eventTittleTicket">
                          {eventData.eventTitle}
                        </div>
                      </div>
                      <div>
                        <div className="text_Decoration ">
                          {eventData.eventTypeSubHeading}
                        </div>
                        <div className="text_Decoration">
                          {getDay()}, {getMonth()} {getDate()}th{" "}
                          {getStartTime()} - {getEndTime()}
                        </div>
                        <div className="text_Decoration">{eventData.city}</div>
                        <div>
                          <div className="flex flex-row items-center justify-between">
                            <div className="text_Decoration font-semibold	">
                              Ticket Type: {orderData.ticketType}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="eventImageTicket h-full">
                      <img className="" src={getImage(eventData)} />
                    </div>
                  </div>

                  <div className="rectangle-47 flex flex-col items-center justify-evenly">
                    <div className="text_Decoration">Admit One</div>
                    <div>
                      <img
                        className="qr-code-bc-94057-f-452-f-4806-af-70-fd-34540-f-72-ad-1"
                        src={`${process.env.NEXT_PUBLIC_API_PATH}${qrimage}`}
                        // src={`${router.basePath}/assets/images/QRcode.png`}
                      />
                    </div>
                    <div className="text_Decoration">Ticket Code</div>
                    <div className="text_Decoration">A2B3DD45</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Main>
  );
};

export default TicketConform;
