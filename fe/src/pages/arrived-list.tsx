import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import { CALL_POST_API } from "src/api";
import AppLoader from "./components/utility/loader";
import PaginatedItems from "./components/utility/pagination";

const ArrivedList = () => {
  const [loader, setLoader] = useState(false);
  const showPerPage = 10;
  const [arrivedList, setArrivedList] = useState<any>([]);
  const [totalCustomer, setTotalCustomer] = useState("");

  const getOrderData = async (pageNum:any) => {
    setLoader(true);
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("eventId");
    const body = {
      _id: eventId,
      pageNum: pageNum,
      pageLength: showPerPage,
    };
    const { success, data } = await CALL_POST_API(
      "arrivedCustomer/get-arrived-data",
      body
    );
    if (success) {
      setArrivedList(data.data);
      setTotalCustomer(data.total);
      setLoader(false);
    } else {
      console.log("Data is not fetch");
    }
  };

  const callAPI = (pageNum: any) => {
    getOrderData(pageNum);
  };

  useEffect(() => {
    callAPI(1);
  }, []);

  return (
    <Layout title="Arrived List" description="Arrived List">
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Arrived List </span>
        </div>

        <div>
          <div className="mt-8 event-main-table">
            <div className="hire-header order-header">
              <div>Customer Name</div>
              <div>Customer Email</div>
            </div>

            <div style={{ display: loader ? "none" : "block" }}>
              {arrivedList?.length === 0 ? (
                <div className="text-center text-white text-xs mt-5">
                  No record found
                </div>
              ) : (
                <div>
                  <div className="hireEvents">
                    {arrivedList?.map((e: any) => (
                      <div>
                        <div className="hire-header hire-header-child order-header">
                          <div>{e.custName}</div>
                          <div>{e.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between my-5">
                    <div className="text-white text-xs">
                      Showing {arrivedList ? arrivedList.length : 0} of{" "}
                      {totalCustomer} Total Customer
                    </div>
                    <div>
                      <PaginatedItems
                        itemsPerPage={showPerPage}
                        eventsLength={totalCustomer}
                        onPageChange={callAPI}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: loader ? "block" : "none" }}>
            <div className="flex justify-center items-center h-64">
              <AppLoader />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArrivedList;
