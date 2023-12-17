import Layout from "./components/layout";
import React, { useEffect, useState } from "react";
import { CALL_POST_API } from "src/api";
import AppLoader from "./components/utility/loader";
import PaginatedItems from "./components/utility/pagination";

const checkschedule = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const showPerPage = 10;

  const getEvents = async (pageNum: any) => {
    setLoading(true);
    const { success, data } = await CALL_POST_API(
      "schedule/check-my-schedule",
      {
        page: pageNum,
        pageSize: showPerPage,
      }
    );

    if (success) {
      setAllEvents(data.data);
      const totalPage = data.total;
      setTotalPage(totalPage);
    }
    setLoading(false);
  };

  useEffect(() => {
    getEvents(1);
  }, []);

  const callAPI = (pageNum: any) => {
    getEvents(pageNum);
  };

  const getDate = (dateString: any) => {
    const date = new Date(dateString);

    // Define an array to convert the month index to its name
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };

  const getTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours} ${ampm}`;
  };

  return (
    <Layout>
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Check Schedule </span>
        </div>

        <div>
          <div className="mt-8 event-main-table">
            <div className="table-header table-schedule">
              <div>Customer Name</div>
              <div>Event Name</div>
              <div>Date</div>
              <div>Time</div>
              <div>Hours</div>
              <div>Price</div>
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
                        className="table-header schedule-header table-header-child"
                        // onClick={() => router.push(`./event-detail?id=${e._id}`)}
                      >
                        <div className="check-schedule-username">
                          {e?.userId?.user_name}
                        </div>
                        <div className="cursor-pointer check-schedule-username">
                          {e?.eventId?.eventTitle}
                        </div>
                        <div>{getDate(e?.eventId?.startTime)}</div>
                        <div>{getTime(e?.eventId?.startTime)}</div>
                        <div className="cursor-pointer">{e?.offer?.hours}</div>
                        <div className="cursor-pointer">
                          $ {e?.offer?.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <div className="flex justify-between items-center my-5">
                  {allEvents.length > 0 && (
                    <div className="text-white text-xs">
                      Showing {allEvents.length} of {totalPage} events
                    </div>
                  )}
                  <div>
                    <PaginatedItems
                      itemsPerPage={showPerPage}
                      eventsLength={totalPage}
                      onPageChange={callAPI}
                    />
                  </div>
                </div> */}
                </div>
              )}
            </div>
            <div style={{ display: loading ? "block" : "none" }}>
              <div className="flex justify-center items-center h-64">
                <AppLoader />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between my-5">
        <div className="text-white text-xs">
          Showing {allEvents.length} of {totalPage} staffers
        </div>
        <div>
          <PaginatedItems
            itemsPerPage={showPerPage}
            eventsLength={totalPage}
            onPageChange={callAPI}
          />
        </div>
      </div>
    </Layout>
  );
};

export default checkschedule;
