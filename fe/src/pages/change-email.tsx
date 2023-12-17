import AppLoader from "./components/utility/loader";
import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import { CALL_GET_API, CALL_POST_API } from "@/api";
import AppNotification, { getSuccessNotification } from "./components/utility/notification";
import Cookies from "js-cookie";

const ChangeEmail = () => {
  const [loader, setLoader] = useState(false);
  const [notification, setNotification] = useState({});
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [changeEmail, setChangeEmail] = useState("");
  const [changeBtnLoader, setChangeBtnLoader] = useState(true);
  const [otpNumber, setOtpNumber] = useState("");
  const [changeEmailBtnLoader, setChangeEmailBtnLoader] = useState(true);
  


  const user = async () => {
    setLoader(true);
    if (Cookies.get("token")) {
    }
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        const user_Data = data.data;

        setEmail(user_Data.email);
        setChangeEmail(user_Data.email);
      }
    } catch (err) { }
    setLoader(false);
  };

  const handleUpdateEmail = async () => {
    try {
      setChangeBtnLoader(false);

      const { success, data } = await CALL_POST_API("user/new-email-update", {
        newEmail: changeEmail,
      });

      if (success) {
        console.log(data);
        setChangeBtnLoader(true);
        setNotification(
          getSuccessNotification("OTP has been sent for email verification.")
        );
        setOtpNumber("");
      }
      setStep(2);
    } catch (error) {
      console.log("error", error);
      setNotification(getSuccessNotification("OTP Invalid"));
    }
  };

  const handleOtpVerify = async () => {
    try {
      const otpnumber = parseInt(otpNumber);
      setChangeEmailBtnLoader(false);
      const { success } = await CALL_POST_API("user/new-email-verify-otp", {
        newEmail: changeEmail,
        otp: otpnumber,
      });

      if (success) {
        setChangeEmailBtnLoader(true);
        setNotification(getSuccessNotification("OTP Verified."));
        setStep(0);
      } else {
        setNotification(getSuccessNotification("OTP Invalid."));
        setChangeEmailBtnLoader(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user();
  }, []);


  return (
    <Layout title="Settings | Popup" description="Settings | Popup">
      {!loader ? (
        <>

          <div className="setting-notify">
            <AppNotification notification={notification} />
          </div>
          <div className="text-white setting-head">Change Email</div>

          <div className="text-white mb-4">Account Email Address</div>

          <small className="text-white mb-4 font-light">{email}</small>
          <div className="setting-input w-2/5">
            <div>
              {step == 0 ? (
                <>
                  <button className="change-btn" onClick={() => setStep(1)}>
                    Change Email
                  </button>
                </>
              ) : (
                <></>
              )}
              <div>
                {step == 1 ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="email"
                      value={changeEmail}
                      onChange={(e: any) => setChangeEmail(e.target.value)}
                    />

                    <div className="change-btn flex justify-center items-center">
                      <button onClick={handleUpdateEmail}>
                        {!changeBtnLoader ? <AppLoader /> : "Send OTP"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {step == 2 ? (
                  <div className="flex flex-col">
                    <input
                      type="number"
                      placeholder="OTP"
                      value={otpNumber}
                      onChange={(e: any) => setOtpNumber(e.target.value)}
                    />

                    <div className="change-btn flex justify-center items-center">
                      <button onClick={handleOtpVerify}>
                        {!changeEmailBtnLoader ? (
                          <AppLoader />
                        ) : (
                          "Change Email"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "20rem" }}
        >
          <AppLoader />
        </div>
      )}
    </Layout>

  )

}

export default ChangeEmail;



