import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import AppLoader from "./components/utility/loader";
import { useRouter } from "next/router";
import { CALL_GET_API } from "@/api";

const Billing = () => {
  const router = useRouter();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  let end_date: any = `${year}-${month}-${day}`;

  const [activeTab, setActiveTab] = useState("");
  const [divLoader, setDivLoader] = useState(false);
  const [allEvents, setAllEvents] = useState<any>([]);
  const [allFilteredEvents, setAllFilteredEvents] = useState<any>([]);

  const [TotalBilled, setTotalBilled] = useState(null);
  const [noEventsMsg, setNoEventsMsg] = useState(false);

  const [futureDateNew, setFutureDate] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(end_date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const [showRightSideDiv, setShowRightSideDiv] = useState(false);

  const getFilterData = () => {
    setAllFilteredEvents(filteredEvents);
    console.log(filteredEvents, setFutureDate);
  };

  const filteredEvents = allEvents.filter((event: any) => {
    const eventDate = event.eventId.startTime.split("T")[0];
    return eventDate >= startDate && eventDate <= endDate;
  });

  const findEventByStaffId = async () => {
    setDivLoader(true);
    try {
      const { success, data } = await CALL_GET_API(
        `event-staff/get-staff-invitation`
      );

      if (success) {
        setAllEvents(data.data);
        setAllFilteredEvents(data.data);
        console.log(data);
        setDivLoader(false);

        if (data.data.length > 0) {
          const firstEvent = data.data[0];
          setActiveTab(firstEvent.eventId.eventTitle);
          setTotalBilled(firstEvent.offer.price);
        }
        if (data.data.length === 0) {
          setNoEventsMsg(true);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const headerLinks = async (e: any) => {
    setShowRightSideDiv(true);
    setActiveTab(e.eventId.eventTitle);
    setTotalBilled(e?.offer?.price);
    console.log(setDivLoader);
  };

  useEffect(() => {
    findEventByStaffId();
  }, []);



  return (
    <Layout
      title="Billing/Earnings | Popup"
      description="Billing/Earnings | Popup"
    >
      <div className="outerDivStyles relative">
        {divLoader ? (
          <>
            <div className="flex justify-center items-center h-full">
              <AppLoader />
            </div>
          </>
        ) : (
          <>
            {noEventsMsg ? (
              <div className="text-white flex justify-center h-full items-center">
                There are No Events
              </div>
            ) : (
              <div className="billingEarningDiv">
                <div className="flex justify-end pr-10 total-earning-div">
                  <div className="flex text-white justify-between items-center total-earning-header">
                    <div className="flex flex-col items-center">
                      <div className="total-earning-title">Total Earned</div>
                      <div className="">$500</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="total-earning-title">
                        Total Withdrawal
                      </div>
                      <div>$500</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="total-earning-title">
                        Available to Withdraw
                      </div>
                      <div>$500</div>
                    </div>
                  </div>
                </div>
                <div className="innerDivStyles">
                  <div className="flex dateTimefix">
                    <input
                      type="date"
                      placeholder="Start/End date & time"
                      // value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="start-date"
                      min={`${tomorrowDate}T00:00`}
                    />
                    <input
                      type="date"
                      placeholder="Start/End date & time"
                      // value={endDate}
                      min={`${futureDateNew}T00:00`}
                      onChange={(e) => setEndDate(e.target.value)}
                      // onClick={endDateFunction}
                      // disabled={!startDate}
                      className="end-date"
                    />
                    <button
                      className="filter-btn"
                      onClick={() => getFilterData()}
                    >
                      Filter
                    </button>

                    {/* {startDate}, {endDate} */}
                  </div>
                  <button
                    className="filter-btn ledger-btn"
                    onClick={() => router.push("/transactions")}
                  >
                    <div>Ledger</div>
                    <div className="h-full flex items-center">
                      {/* <img
                        src={`${router.basePath}/assets/images/arrow.png`}
                        className="imgArr"
                      /> */}
                    </div>
                  </button>
                </div>
                <div className="eventListStyles">
                  {allFilteredEvents.length === 0 ? (
                    <>
                      <div className="text-white flex justify-center h-full w-full items-center">
                        There are No Events
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`leftSideStyles ${
                          !showRightSideDiv ? "showLeftDiv" : "hideLeftDiv"
                        }`}
                      >
                        {allFilteredEvents.map((e: any) => (
                          <div
                            onClick={() => headerLinks(e)}
                            className={`tab first-line:cursor-pointer addEventsPadding ${
                              activeTab === e.eventId.eventTitle
                                ? "activeRightB"
                                : ""
                            }`}
                          >
                            <div className="eventItemStyles">
                              {e.eventId.eventTitle}
                            </div>
                            <div className="text-sm font-light text-white">
                              $ {e?.offer?.price}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`rightSideStyles relative ${
                          showRightSideDiv ? "showRightDiv" : "hideRightDiv"
                        }`}
                      >
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
                        <div className="billingEarningHeader">
                          <div className="text-white font-medium w-3/6">
                            Job Title
                          </div>
                          <div className="text-white font-medium w-3/6 text-right">
                            Billed
                          </div>
                        </div>
                        <div
                          className="billingEarningHeader"
                          style={{ minHeight: "10rem" }}
                        >
                          <div className="text-white font-medium w-3/6">
                            {activeTab}
                          </div>
                          <div className="text-white font-medium w-3/6 text-right">
                            ${TotalBilled}
                          </div>
                        </div>
                        <div
                          className="billingEarningHeader"
                          style={{ minHeight: "4rem" }}
                        >
                          <div className="text-white font-medium w-3/6">
                            Total Billed
                          </div>
                          <div className="text-white font-medium w-3/6 text-right">
                            ${TotalBilled}
                          </div>
                        </div>
                        <div className="billingEarningHeader">
                          <div
                            className="text-white font-medium w-3/6"
                            style={{ color: "rgba(39, 184, 158, 1)" }}
                          >
                            Earnings
                          </div>
                          <div
                            className="text-white font-medium w-3/6 text-right"
                            style={{ color: "rgba(39, 184, 158, 1)" }}
                          >
                            ${TotalBilled}
                          </div>
                        </div>
                        <div className="flex paypal-btn justify-center items-center mt-5 ml-5">
                          <img
                            src={`${router.basePath}/assets/images/paypal.png`}
                            className="w-4 h-4 mr-2"
                            alt=""
                          />
                          <div className="text-black text-lg">
                            Withdraw Payment
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Billing;
