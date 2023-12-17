import React from "react";
import Layout from "./components/layout";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import { useEffect, useState } from "react";
import AppLoader from "./components/utility/loader";
import { useRouter } from "next/router";
import PaginatedItems from "./components/utility/pagination";

const OrderList = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [services, setServices] = useState([]);
  const [activeTabID, setActiveTabID] = useState("");
  const [loader, setLoader] = useState(false);
  const showPerPage = 10;
  const [totalStaff, setTotalStaff] = useState();
  const [orderList, setOrderList] = useState<any>([]);
  const [totalCustomer, setTotalCustomer] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [selectedOption, setSelectedOption] = useState("allData");
  const [pageNum, setPageNum] = useState(1);

  const headerLinks = async (e: any) => {
    if (e === "All") {
      setActiveTab("All");
      setActiveTabID("");
    } else {
      setActiveTab(e.name);
      setActiveTabID(e._id);
    }
  };

  console.log(headerLinks);

  const getMasterData = async () => {
    const { data } = await CALL_GET_API("master_data/all");
    const master = data.data;
    const getServices = master.filter((e: any) => {
      return e.type === "SERVICE_CATEGORY";
    });
    setServices(getServices);
    console.log(setPageNum);
  };

  const getOrderList = async (pageNum: any, timeFilter: string = "allData") => {
    setLoader(true);
    const body = {
      page: pageNum,
      pageSize: showPerPage,
      timeFilter: timeFilter,
    };
    const data = await CALL_POST_API("order/get-all-order", body);
    const orderList = data.data;
    setTotalRevenue(totalRevenue);
    setTotalCustomer(orderList.allEventsOrders);
    setOrderList(orderList.data);
    setTotalStaff(data.data.allEventsOrders);
    setLoader(false);
    console.log(services);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
    getOrderList(pageNum, newSelectedOption); // Call the function with the selected option
  };

  const getOrdersWithoutPagi = async () => {
    const { success, data } = await CALL_GET_API(
      "events/get-event-without-pagination"
    );
    console.log(success, activeTab);
    const res = data.data;
    const acc = 0;
    const total = res?.map((e: any) => acc + e.totalRevenue);
    const totalRevenue = total.reduce(sum, 0);
    function sum(total: any, num: any) {
      return total + num;
    }
    setTotalRevenue(totalRevenue);
    setTotalCustomer(data.data.length);
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

  useEffect(() => {
    getMasterData();
    getOrderList(1);
    getOrdersWithoutPagi();
  }, []);

  const callAPI = (pageNum: any) => {
    getOrderList(pageNum);
  };

  useEffect(() => { }, [activeTabID]);

  return (
    <Layout title="Order List" description="Order List">
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Event /</span> Order List
        </div>

        <div className="flex mt-5 flex-column">
          <div className="w-8/12 flex justify-between event-header width-100">
            <div className="w-9/12 flex justify-between items-center event-h-left">
              <div className="font-Size order-listlheadertext">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              </div>
              <div className="flex items-end cursor-pointer ">
                <img
                  className="w-4 h-4 mr-3 mb-2 ic_img"
                  src={`${router.basePath}/assets/images/ic_stat.png`}
                  alt=""
                />
                <div>
                  <span className="font-Size text-Color">Income</span>
                  <div className="text-white ic_text">${totalRevenue}</div>
                </div>
              </div>
              <div className="flex items-end cursor-pointer ">
                <img
                  className="w-4 h-4 mr-3 mb-2 ic_img"
                  src={`${router.basePath}/assets/images/ic_stat_trade.png`}
                  alt=""
                />
                <div>
                  <span className="font-Size">Customer</span>
                  <div className="text-white ic_text">
                    {totalCustomer} Person
                  </div>
                </div>
              </div>
              {/* <div className="flex items-end cursor-pointer ">
                <img
                  className="w-4 h-4 mr-3 mb-2 ic_img"
                  src={`${router.basePath}/assets/images/ic_statRound.png`}
                  alt=""
                />
                <div>
                  <span className="font-Size">Than last week</span>
                  <div className="text-white ic_text">72%</div>
                </div>
              </div> */}
            </div>
            <div className="3/12 flex items-center">
              <select
                className="text-xs bg-green-500  px-3 py-1 rounded select-week cursor-pointer theWeek w-full"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="allData">All Data</option>
              </select>
            </div>
          </div>
          <div className="w-4/12 width-100 create-e-btn-parent">
            <div className="create-e-btn dashboard-btn-order">
              Generate Order Report
            </div>
          </div>
        </div>

        <div>
          <div className="mt-8 event-main-table">
            <div className="hire-header order-header">
              <div>Order ID</div>
              <div>Date</div>
              <div>Event Name</div>

              <div className="flex items-center">
                Customer Name
                <img
                  src={`${router.basePath}/assets/images/ic_sort.png`}
                  className="w-2 h-3 ml-2"
                  alt=""
                />
              </div>
              <div>Location</div>
              <div>Sold Ticket</div>

              <div>Total Revenue</div>
            </div>

            <div style={{ display: loader ? "none" : "block" }}>
              {orderList?.length === 0 ? (
                <div className="text-center text-white text-xs mt-5">
                  No record found
                </div>
              ) : (
                <div>
                  <div className="hireEvents">
                    {orderList?.map((e: any) => (
                      <div>
                        <div className="hire-header hire-header-child order-header">
                          <div>{e.orderId}</div>
                          <div>{getDate(e.createdAt)}</div>
                          <div>{e.eventId.eventTitle}</div>
                          <div>{e.customerName}</div>
                          <div>{e.eventId.city}</div>
                          <div>{e.quantity}</div>

                          <div className="totel-revenue">${e.totalAmount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between my-5">
                    <div className="text-white text-xs">
                      Showing {orderList ? orderList.length : 0} of {totalStaff} Orders
                    </div>
                    <div>
                      <PaginatedItems
                        itemsPerPage={showPerPage}
                        eventsLength={totalStaff}
                        onPageChange={callAPI}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        <div style={{ display: loader ? "block" : "none" }}>
          <div className="flex justify-center items-center h-64">
            <AppLoader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderList;
