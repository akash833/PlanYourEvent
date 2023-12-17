import Layout from "./components/layout";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import { useEffect, useState } from "react";
import AppLoader from "./components/utility/loader";
import { useRouter } from "next/router";
import PaginatedItems from "./components/utility/pagination";

const hireEventStaff = () => {
  const router = useRouter();
  const [hireEventStaff, setHireEventStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [services, setServices] = useState([]);
  const [activeTabID, setActiveTabID] = useState("");
  const [loader, setLoader] = useState(true);
  const [contactLoader, setContactLoader] = useState("");
  const [recordMsgShow, setRecordMsgShow] = useState(false);
  const showPerPage = 100;
  const [totalStaff, setTotalStaff] = useState();
  const [totalPage, setTotalPage] = useState();

  const getHireEventStaffData = async (pageNum: any) => {
    setLoader(false);
    setRecordMsgShow(true);
    const { data } = await CALL_POST_API(
      `user/get-events-staff-users?type=${activeTabID}`,
      { page: pageNum, pageSize: showPerPage }
    );
    setLoader(true);
    setRecordMsgShow(false);
    setHireEventStaff(data.data);
    setTotalStaff(data.totalStaff);
    setTotalPage(data.totalPage);
    console.log(totalPage);
  };

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

  const createGroup = async (staffId: string) => {
    setContactLoader(staffId);
    const body = {
      name: "ContactHire",
      isOneToOne: true,
      members: [{ userId: staffId }],
    };
    const { success, data } = await CALL_POST_API("chat_group", body);
    setContactLoader("");
    console.log(data);
    if (success) {
      router.push("/chatBox/?ref=" + data.data._id);
    } else {
      alert("Unable to contact staff");
    }
  };

  useEffect(() => {
    getMasterData();
  }, []);

  useEffect(() => {
    getHireEventStaffData(1);
  }, [activeTabID]);

  const callAPI = (pageNum: any) => {
    getHireEventStaffData(pageNum);
  };
  return (
    <Layout
      title="Hire Event Staff | Popup"
      description="Hire Event Staff | Popup"
    >
      <div>
        <div className="text-sm py-2 px-6">
          <span style={{ color: "#13B497" }}>Event /</span> Hire Event Staff
        </div>

        <div
          className="mt-5 flex hire-tabs"
          style={{ justifyContent: "normal",overflowX:'auto' }}
        >
          <div
            onClick={() => headerLinks("All")}
            className={`tab ${activeTab === "All" ? "active-borderB" : ""}`}
          >
            All
          </div>
          {services.map((e: any) => (
            <div
              onClick={() => headerLinks(e)}
              className={`tab ${activeTab === e.name ? "active-borderB" : ""}`}
            >
              {e.name}
            </div>
          ))}
        </div>
        <div className="mt-8 event-main-table">
          <div className="hire-header">
            <div>Event Staff</div>
            <div>Skills</div>
            <div>Bio</div>
            <div className="ml-5">Action</div>
          </div>

          <div style={{ display: recordMsgShow ? "none" : "block" }}>
            {hireEventStaff?.length === 0 ? (
              <div className="text-center text-white text-xs mt-5">
                No Staff is found
              </div>
            ) : (
              <div>
                <div className="hireEvents">
                  {hireEventStaff?.map((e: any) => (
                    <div>
                      <div className="hire-header hire-header-child">
                        <div className="flex items-center">
                          {e.image ? (
                            <img
                              src={e.image}
                              alt=""
                              className="mr-3 w-8 h-8 rounded-lg"
                            />
                          ) : (
                            <img
                              src={`${router.basePath}/assets/images/ic_user.png`}
                              alt=""
                              className="mr-3 w-8 h-8 rounded-lg"
                            />
                          )}
                          <div style={{ fontSize: "14px" }}>{e.user_name}</div>
                        </div>
                        <div className="flex flex-wrap">
                          {e.service_category.map((tag: any) => {
                            return (
                              <div className="staff-skills flex items-center mr-2 mb-2">
                                <img
                                  src={`${router.basePath}/assets/images/label.png`}
                                  alt=""
                                  className="w-4 h-4 mr-1"
                                />
                                {tag.name}
                              </div>
                            );
                          })}
                        </div>
                        <div>{e.bio}</div>
                        <div className="ml-5">
                          <button
                            className="revenue-btn"
                            onClick={() => createGroup(e._id)}
                          >
                            {contactLoader == e._id ? <AppLoader /> : "Contact"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between my-5">
                  <div className="text-white text-xs">
                    Showing {hireEventStaff.length} of {totalStaff} staffers
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

        <div style={{ display: loader ? "none" : "block" }}>
          <div className="flex justify-center items-center h-64">
            <AppLoader />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default hireEventStaff;
