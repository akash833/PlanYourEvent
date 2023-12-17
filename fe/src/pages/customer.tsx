import React from "react";
import Layout from "./components/layout";
import { CALL_GET_API } from "src/api";
import { useEffect, useState } from "react";
import AppLoader from "./components/utility/loader";
import { useRouter } from "next/router";
import PaginatedItems from "./components/utility/pagination";

const Customer = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [services, setServices] = useState([]);
  const [activeTabID, setActiveTabID] = useState("");
  const [loader, setLoader] = useState(false);
  const [recordMsgShow, setRecordMsgShow] = useState(false);
  const showPerPage = 1;
  const pageNum = 1;
  const [totalStaff, setTotalStaff] = useState("");
  const [getReviews, setGetReviews] = useState([]);

  const getReviewsapi = async () => {
    setLoader(true);
    const { data } = await CALL_GET_API("review/");
    const reviews = data.data;
    setGetReviews(reviews);
    setLoader(false);
    console.log(services);
    setRecordMsgShow(true);
    setTotalStaff("");
  };

  const callAPI = () => {
console.log(callAPI)
  }

  const headerLinks = async (e: any) => {
    if (e === "All") {
      setActiveTab("All");
      setActiveTabID("");
    } else {
      setActiveTab(e.name);
      setActiveTabID(e._id);
    }
  };

  const getMasterData = async () => {
    const { data } = await CALL_GET_API("master_data/all");
    const master = data.data;
    const getServices = master.filter((e: any) => {
      return e.type === "SERVICE_CATEGORY";
    });
    setServices(getServices);
  };

  useEffect(() => {
    getMasterData();
    getReviewsapi();
  }, []);

  useEffect(() => {}, [activeTabID]);

  return (
    <Layout>
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Customer /</span> Reviews
        </div>

        <div className="mt-5 flex hire-tabs">
          <div style={{ display: "flex" }}>
            <div
              onClick={() => headerLinks("All")}
              className={`tab ${activeTab === "All" ? "active-borderB" : ""}`}
            >
              All Reviews
            </div>
            <div>Published</div>
            <div>Deleted</div>
          </div>

          <div className="all-btn">
            <button className="publish-btn">Publish</button>
            <button className="delete-btn ml-2">Delete</button>
          </div>
        </div>
        <div className="mt-8 event-main-table">
          <div className="hire-header">
            <div className="flex items-center">
              <input value="One" type="checkbox" className="mr-4" />
              Customer
              <img
                src={`${router.basePath}/assets/images/ic_sort.png`}
                className="w-2 h-3 ml-2"
                alt=""
              />
            </div>

            <div>Event Name</div>
            <div>Stars Review</div>
            <div>Action</div>
          </div>

          <div style={{ display: recordMsgShow ? "none" : "block" }}>
            {getReviews?.length === 0 ? (
              <div className="text-center text-white text-xs mt-5">
                No record found
              </div>
            ) : (
              <div>
                <div className="hireEvents">
                  {getReviews?.map((e: any) => (
                    <div>
                      <div className="hire-header hire-header-child">
                        <div className="flex">
                          <input value="One" type="checkbox" className="mr-4" />
                          {e.img ? (
                            <img
                              src={e.img}
                              alt=""
                              className="w-8 h-8 rounded-lg"
                            />
                          ) : (
                            <img
                              src={`${router.basePath}/assets/images/profilePicture.png`}
                              alt=""
                              className="w-8 h-8"
                            />
                          )}
                          <div>
                            <div style={{ fontSize: "14px" }}>{e.name}</div>
                            <div>{e.time}</div>
                          </div>
                        </div>

                        <div>{e.eventName}</div>
                        <div>
                          <img
                            src={`${router.basePath}/assets/images/rating.png`}
                            alt=""
                          />

                          <p className="mt-3">{e.review}</p>
                        </div>
                        <div>
                          <button className="publi-btn">Publish</button>
                          <button className="dele-btn ml-2">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between my-5">
                  <div className="text-white text-xs">
                    Showing {getReviews?.length * pageNum} of {totalStaff}{" "}
                    staffers
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

        <div style={{ display: loader ? "block" : "none" }}>
          <div className="flex justify-center items-center h-64">
            <AppLoader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;
