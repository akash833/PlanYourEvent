import Layout from "./components/layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import AppLoader from "./components/utility/loader";
import PaginatedItems from "./components/utility/pagination";

const event = () => {
  const router = useRouter();
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalEvents, setTotalEvents] = useState(10);
  const [totalCustomer, setTotalCustomer] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState("");

  const showPerPage = 10;

  const getEvents = async (pageNum: any, timeFilter: string = "allData") => {
    setLoading(true);
    const { success, data } = await CALL_POST_API("events/get-event", {
      page: pageNum,
      pageSize: showPerPage,
      timeFilter: timeFilter
    });

    if (success) {
      setAllEvents(data.data);
      setTotalEvents(data.totalEvents);
    }
    setLoading(false);
    console.log(selectedOption);
  };

  const getEventsWithoutPagi = async () => {
    const { success, data } = await CALL_GET_API(
      "events/get-event-without-pagination"
    );

    console.log(success);
    const res = data.data;
    const acc = 0;
    const total = res?.map((e: any) => acc + e.totalRevenue);
    const totalRevenue = total?.reduce(sum, 0);
    function sum(total: any, num: any) {
      return total + num;
    }
    setTotalRevenue(totalRevenue);
    setTotalCustomer(data?.data?.length);
  };

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    getEvents(1,option);
  };

  useEffect(() => {
    getEventsWithoutPagi();
  }, []);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const callAPI = (pageNum: any) => {
    setSelectedOption('allData');
    getEvents(pageNum);
  };
  
  useEffect(() => {
    callAPI(1);
  }, []);

  return (
    <Layout title="Events | Popup" description="Events | Popup">
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Event /</span> Event List
        </div>
        <div className="flex mt-5 flex-column">
          <div className="w-8/12 flex justify-between event-header width-100">
            <div className="w-9/12 flex justify-between items-center event-h-left">
              <div className="font-Size">
                View the statistics for your events here.
              </div>
              <div className="flex items-end cursor-pointer ">
                <img
                  className="w-4 h-4 mr-3 mb-2 ic_img"
                  src={`${router.basePath}/assets/images/ic_stat.png`}
                  alt=""
                />
                <div>
                  <span className="font-Size text-Color">Income</span>
                  <div className="text-white ic_text">$ {totalRevenue}</div>
                </div>
              </div>
              <div className="flex items-end cursor-pointer ">
                <img
                  className="w-4 h-4 mr-3 mb-2 ic_img"
                  src={`${router.basePath}/assets/images/ic_stat_trade.png`}
                  alt=""
                />
                <div>
                  <span className="font-Size">Total Events</span>
                  <div className="text-white ic_text">
                    {`${totalCustomer} Events`}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <select
                className="text-xs bg-green-500 py-1 rounded select-week cursor-pointer theWeek w-full"
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="allData">All Data</option>
              </select>
            </div>
          </div>
          <div className="w-1/5 width-100 create-e-btn-parent">
            <div
              className="create-e-btn"
              onClick={() => router.push("/newevent")}
            >
              Create New Event
            </div>
          </div>
          <div className="w-1/5 width-100 create-e-btn-parent">
            <div
              className="create-e-btn"
              onClick={() => router.push("/hire-event-staff")}
            >
              Hire Event Staff
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8 event-main-table">
            <div className="table-header">
              <div>Event Title</div>
              <div className="flex items-center">
                Date
                <img
                  src={`${router.basePath}/assets/images/ic_sort.png`}
                  className="w-2 h-3 ml-2"
                  alt=""
                />
              </div>
              <div>Address</div>
              <div>City</div>
              <div>Sold Tickets</div>
              <div>Available Tickets</div>
              <div>Staff Hired</div>
              <div>Total Revenue</div>
            </div>
            <div style={{ display: loading ? "none" : "block" }}>
              {allEvents.length === 0 ? (
                <div className="text-center text-white text-xs mt-5">
                  No record found
                </div>
              ) : (
                <div>
                  <div className="tableEvents">
                    {allEvents.map((e: any) => (
                      <div
                        key={e._id}
                        className="table-header table-header-child cursor-pointer"
                        onClick={() =>
                          router.push(`./event-detail?id=${e._id}`)
                        }
                      >
                        <div className="event-title">
                          {e.eventTitle} <br /> {e.eventTypeSubHeading}
                        </div>
                        <div>
                          {formatDate(e.startTime)} <br />{" "}
                          {new Date(e.startTime).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </div>
                        <div>{e.Address}</div>

                        <div>{e.city}</div>
                        <div className="cursor-pointer">{e.soldTickets}</div>
                        <div className="cursor-pointer">{e.unsoldTickets}</div>
                        <div className="cursor-pointer">
                          {e.totalStaff.length}
                        </div>
                        <div>
                          <button className="revenue-btn">
                            ${e.totalRevenue}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center my-5">
                    {allEvents.length > 0 && (
                      <div className="text-white text-xs">
                        Showing {allEvents.length} of {totalEvents} events
                      </div>
                    )}
                    <div>
                      <PaginatedItems
                        itemsPerPage={showPerPage}
                        eventsLength={totalEvents}
                        onPageChange={callAPI}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: loading ? "block" : "none" }}>
              <div className="flex justify-center items-center h-64">
                <AppLoader />
              </div>
            </div>

            {/* <div>
              <div className="tableEvents">
                {allEvents.map((e: any) => (
                  <div
                    key={e._id}
                    className="table-header table-header-child"
                    onClick={() => router.push(`./event-detail?id=${e._id}`)}
                  >
                    <div className="event-title">
                      {e.eventTitle} <br /> {e.eventTypeSubHeading}
                    </div>
                    <div>
                      {formatDate(e.startTime)} <br />{" "}
                      {new Date(e.startTime).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                    <div>{e.Address}</div>

                    <div>{e.city}</div>
                    <div className="cursor-pointer">{e.soldTickets}</div>
                    <div className="cursor-pointer">{e.unsoldTickets}</div>
                    <div className="cursor-pointer">{e.totalStaff.length}</div>
                    <div>
                      <button className="revenue-btn">${e.totalRevenue}</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center my-5">
                {allEvents.length > 0 && (
                  <div className="text-white text-xs">
                    Showing {allEvents.length} of {totalEvents} events
                  </div>
                )}
                <div>
                  <PaginatedItems
                    itemsPerPage={showPerPage}
                    eventsLength={totalEvents}
                    onPageChange={callAPI}
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default event;
