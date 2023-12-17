import React, { useEffect } from "react";
import Layout from "./components/layout";
import Link from "next/link";
import { CALL_GET_API } from "src/api";
import { useState } from "react";
import { useRouter } from "next/router";
import PaginatedItems from "./components/utility/pagination";
import AppLoader from "./components/utility/loader";

const CustomerList = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [services, setServices] = useState([]);
  const [activeTabID, setActiveTabID] = useState("");
  const [recordMsgShow, setRecordMsgShow] = useState(false);
  const showPerPage = 1;
  const pageNum = 1;
  const [totalStaff, setTotalStaff] = useState("");
  const[ custList, setCustList] = useState<any>([])
   const [loader, setLoader] = useState(false);

  useEffect(() => {
    setRecordMsgShow(false);
    setTotalStaff("");
    setActiveTab("");
    setActiveTabID("");
  }, []);

  const getMasterData = async () => {
    const { data } = await CALL_GET_API("master_data/all");
    const master = data.data;
    const getServices = master.filter((e: any) => {
      return e.type === "SERVICE_CATEGORY";
    });
    setServices(getServices);
    console.log(activeTab, services);
  };

  const callAPI = (pageNum: any) => {
    console.log(pageNum);
  };


  const getCustomerList = async () => {
    setLoader(true);
        const { data } = await CALL_GET_API("customer/get-cust-list");
        const custList = data.data;
        setCustList(custList);
        setLoader(false);
  }

  // const getReviews = [
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  //   {
  //     custId: "#12345",
  //     dateJoin: "22/02/2022",
  //     name: "Paras",
  //     ticketOrder: "The Story of Danau Toba (Musical Drama)",
  //     location: "London",
  //     lastOrder: "22/01/2021",
  //     time: "22/02/23,Sunday",
  //     totalSpent: "$123",
  //   },
  // ];

  useEffect(() => {
    getMasterData();
    getCustomerList();
  }, [activeTabID]);

  return (
    <Layout>
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Customer /</span> Customer List
        </div>

        <div className="flex new-gap">
          <div className="dashboard-btn-new">
            <button className="cursor-pointer">
              <Link href="" className="border-none text-white ">
                + New Customer
              </Link>
            </button>
          </div>
          <div className="flex customer-total">
            <div className="flex ic-user">
              <img
                src={`${router.basePath}/assets/images/icUser.png`}
                className="ic-image"
              />
              <div>
                <div className="total">Total Customer</div>
                <div className="digit-total">123456</div>
              </div>
            </div>
            <div className="flex">
              <div className="active-btn">
                <img
                  src={`${router.basePath}/assets/images/vecRight.png`}
                  className="vec-right"
                />
                Active
              </div>
              <div className="edit-btn">Edit</div>
              <div className="delete-btn-cust">Delete</div>
            </div>
          </div>
        </div>

        <div className="mt-8 event-main-table">
          <div className="hire-header">
            <div className="flex items-center">
              <input value="One" type="checkbox" className="mr-4" />
              Cust. ID
            </div>
            <div>Date Join</div>
            <div className="flex items-center">
              Customer Name
              <img
                src={`${router.basePath}/assets/images/ic_sort.png`}
                className="w-2 h-3 ml-2"
                alt=""
              />
            </div>
            <div>Ticket Ordered</div>
            <div>Location</div>
            <div>Last Order</div>
            <div>Total Spent</div>
            <div></div>
          </div>

          <div style={{ display: recordMsgShow ? "none" : "block" }}>
            {custList?.length === 0 ? (
              <div className="text-center text-white text-xs mt-5">
                No record found
              </div>
            ) : (
              <div>
                <div className="hireEvents">
                  {custList.map((e: any) => (
                    <div>
                      <div className="hire-header hire-header-child">
                        <div className="flex">
                          <input value="One" type="checkbox" className="mr-4" />
                          {e.custId}
                        </div>

                        <div>{e.dateJoin}</div>
                        <div>{e.name}</div>
                        <div>{e.ticketOrder}</div>
                        <div>{e.location}</div>
                        <div>{e.lastOrder}</div>
                        <div>{e.totalSpent}</div>

                        <div className="flex gap-4">
                          <img
                            src={`${router.basePath}/assets/images/edit.png`}
                          />
                          <img
                            src={`${router.basePath}/assets/images/ic_delete.png`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between my-5">
                  <div className="text-white text-xs">
                    Showing {custList?.length * pageNum} of {totalStaff}{" "}
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

export default CustomerList;
