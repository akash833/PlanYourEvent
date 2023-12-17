import { CALL_GET_API, CALL_POST_API } from "@/api";
import router from "next/router";
import React, { useEffect, useState } from "react";
import AppNotification, {
  getSuccessNotification,
} from "./components/utility/notification";
import AppLoader from "./components/utility/loader";
import Swal from "sweetalert2";


const EventStaffDetails = () => {
  const [eventStaffData, setEventStaffData] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [recordMsgShow, setRecordMsgShow] = useState(false);
  const [notification, setNotification] = useState({});
  const [removeStaffBtn, setRemoveStaffBtn] = useState(false);

  const eventStaffAll = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    setLoader(true);
    // setRecordMsgShow(true);
    const { success, data } = await CALL_GET_API(
      `event-staff/all?eventId=${eventId}`
    );
    if (success) {
      setEventStaffData(data.data);
    }
    setLoader(false);
    // setRecordMsgShow(false);
    console.log(loader);
  };

  const removeStaff = async (_id: any) => {
    const { success, data } = await CALL_POST_API(
      `event-staff/remove-event-staff?_id=${_id}`,
      {}
    );
    if (success) {
      console.log(data);
      setNotification(getSuccessNotification("Staff Deleted"));
    }
    eventStaffAll();
  };

  const paidStaff = async (staffId: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    const body = {
      staffId: staffId,
      eventId: eventId,
    };
    const { success, data } = await CALL_POST_API(
      `event-staff/update-payment-status`,
      body
    );
    if (data.success) {
      eventStaffAll();
      setRemoveStaffBtn(true);
      console.log(data, success);
    }
    if (!data.success) {
      Swal.fire({
        text: "You have not sufficient balance",
      });
      console.log(data, success);
    }
  };



  const showConfirmationModal = (id: any) => {
    Swal.fire({
      text: 'You want to pay staff?',
      showCancelButton: true, // Show the Cancel button
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        paidStaff(id);
      } else if(result.isDismissed) {
        Swal.fire('You clicked Cancel!', '', 'error');
      }
    });
  };

  useEffect(() => {
    // getEventById();
    eventStaffAll();
  }, []);
  return (
    <div>
      <div className="setting-notify">
        <AppNotification notification={notification} />
      </div>
      <div style={{ marginTop: "50px", color: "white" }}>
        <h4>Staff Members</h4>
      </div>
      <div className="mt-8 event-main-table">
        <div className="hire-header staff_table">
          <div>Event Staff</div>
          <div>Skills</div>
          <div>Bio</div>
          <div>Price/Hour</div>
          <div>Payment Status</div>
          <div className="ml-5">Action</div>
        </div>

        {/* <div style={{ display: "block" }}> */}
        {/* <div> */}
        {/* <div> */}
        <div style={{ display: loader ? "none" : "block" }}>
          {eventStaffData.length === 0 ? (
            <div className="text-center text-white text-xs mt-5">
              Staff is not found
            </div>
          ) : (
            <div>
              {eventStaffData.map((e: any) => (
                <div className="hire-header hire-header-child staff_table">
                  <div className="flex items-center">
                    <img
                      src={e.staffId.image ? e.staffId.image : `${router.basePath}/assets/images/ic_user.png`}

                      alt=""
                      className="w-8 h-8 rounded-lg mr-2"
                    />
                    {e.staffId.user_name}
                  </div>
                  <div className="flex flex-wrap"
                    style={{ gap: '10px' }}
                  >
                    {e.staffId.service_category.map((tag: any) => {
                      return (
                        <p className="staff-skills flex items-center">
                          <img
                            src={`${router.basePath}/assets/images/label.png`}
                            alt=""
                            className="w-4 h-4 mr-1"
                          />
                          {tag.name}
                        </p>
                      );
                    })}
                  </div>
                  <div className="">{e.staffId.bio}</div>
                  <div>
                    ${e.offer.price} for {e.offer.hours} Hours
                  </div>
                  <div>
                    {e.payStatus === "unpaid" ? (
                      <button
                        className="paidEvent"
                        onClick={() => showConfirmationModal(e.staffId._id)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      "Paid"
                    )}
                  </div>
                  <div className="">
                    <button
                      className="revenue-btn"
                      onClick={() => router.push("./chatBox")}
                    >
                      Contact
                    </button>
                    {removeStaffBtn ? (
                      <></>
                    ) : (
                      <button
                        className="removeEvent"
                        style={{ marginTop: "10px" }}
                        onClick={() => removeStaff(e._id)}
                      >
                        Remove from event
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: loader ? "block" : "none" }}>
          <div className="flex justify-center items-center h-64">
            <AppLoader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStaffDetails;
