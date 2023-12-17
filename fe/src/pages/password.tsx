import AppLoader from "./components/utility/loader";
import React, { useState } from "react";
import Layout from "./components/layout";
import { CALL_POST_API } from "@/api";
import AppNotification, { getSuccessNotification } from "./components/utility/notification";
import { FiEyeOff, FiEye } from "react-icons/fi";

const YourPassword = () => {
  const [currentPassworrd, setCurrentPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [notification, setNotification] = useState({});
  const [passwordMatchMsg, setPasswordMatchMsg] = useState(false);
  const [currentPassworrdMatch, setCurrentPassworrdMatch] = useState(false);
  const [saveBtnLoader, setSaveBtnLoader] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [confirmShowPassword, setconfirmShowPassword] = useState(true);
  const [newShowPassword, setnNewShowPassword] = useState(true);
  const [currentShowPassword, setCurrentPassworrd] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");




  const updatePassword = async () => {
    setPasswordMatchMsg(false);
    setCurrentPassworrdMatch(false);
    if (newPassword === confirmNewPassword) {
      if (newPassword.length >= 8) {
        setSaveBtnLoader(false);
        setLoader(true);

        const body = {
          password: currentPassworrd,
          newPassword: newPassword,
        };
        const { success, data } = await CALL_POST_API(
          "user/update-password",
          body
        );
        if (success) {
          console.log(data);
          setSaveBtnLoader(true);
          setLoader(false);
          setNotification(
            getSuccessNotification("Password Updated Successfully.")
          );
        } else {
          setCurrentPassworrdMatch(true);
        }
      } else {
        setValidPassword(true);
      }
    } else {
      setPasswordMatchMsg(true);
    }
    setSaveBtnLoader(true);
    setLoader(false);
  };

  const passwordToogle = (e: any) => {
    if (e == "confirmNewPassword") {
      setconfirmShowPassword(!confirmShowPassword);
    } else if (e == "NewPassword") {
      setnNewShowPassword(!newShowPassword);
    } else if (e == "CurrentPassword") {
      setCurrentPassworrd(!currentShowPassword);
    }
  };

  return (
    <Layout title="Settings | Popup" description="Settings | Popup">
      {!loader ? (
        <>

          <div className="setting-notify">
            <AppNotification notification={notification} />
          </div>
          <div className="text-white setting-head">Your Password</div>
          <small className="text-white font-light text-xs">
              Set A New Password.
            </small>
            <div className="">
              <div
                className="flex items-center setting-pass justify-between media-q-r mt-4 "
                style={{
                  backgroundColor: "#ffff",
                  color: "black",
                  borderRadius: "8px",
                }}
              >
                <input
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={currentShowPassword ? "password" : "text"}
                  placeholder="Current Password*"
                  style={{ backgroundColor: "#ffff", color: "black" }}
                />
                <div style={{ backgroundColor: "#ffff", color: "black" }}>
                  <FiEyeOff
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("CurrentPassword")}
                    style={{
                      display: currentShowPassword ? "block" : "none",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                  <FiEye
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("CurrentPassword")}
                    style={{
                      display: currentShowPassword ? "none" : "block",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                </div>
              </div>
              {currentPassworrdMatch ? (
                <div className="wrong-msg">Current Password Not Matched</div>
              ) : (
                <></>
              )}

              <div
                className="flex items-center setting-pass justify-between media-q-r mt-4"
                style={{ backgroundColor: "#ffff", borderRadius: "8px" }}
              >
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={newShowPassword ? "password" : "text"}
                  placeholder="New Password*"
                  style={{ backgroundColor: "#ffff", color: "black" }}
                />
                <div style={{ backgroundColor: "#ffff", color: "black" }}>
                  <FiEyeOff
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("NewPassword")}
                    style={{
                      display: newShowPassword ? "block" : "none",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                  <FiEye
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("NewPassword")}
                    style={{
                      display: newShowPassword ? "none" : "block",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                </div>
              </div>

              <div
                className="flex items-center setting-pass justify-between media-q-r mt-4"
                style={{ backgroundColor: "#ffff", borderRadius: "8px" }}
              >
                <input
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  type={confirmShowPassword ? "password" : "text"}
                  placeholder="Confirm New Password*"
                  style={{ backgroundColor: "#ffff", color: "black" }}
                />
                <div style={{ backgroundColor: "#ffff", color: "black" }}>
                  <FiEyeOff
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("confirmNewPassword")}
                    style={{
                      display: confirmShowPassword ? "block" : "none",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                  <FiEye
                    className="eye-icon text-white"
                    onClick={() => passwordToogle("confirmNewPassword")}
                    style={{
                      display: confirmShowPassword ? "none" : "block",
                      backgroundColor: "#ffff",
                      color: "black",
                    }}
                  />
                </div>
              </div>
              {passwordMatchMsg ? (
                <div className="wrong-msg">
                  Password and confirm password are not matching
                </div>
              ) : (
                <></>
              )}
              <div className="mt-2">
                {/* <small className="text-white font-light text-xs">
              Password Strength
            </small> */}
                {/* <div className="lineGraph"></div> */}
                <small
                  className="text-white font-light"
                  style={{ color: validPassword ? "red" : "", fontSize: "8px" }}
                >
                  *Your Password Must Be At Least 8 Characters
                </small>
              </div>
            </div>
            <button
              className="change-btn"
              onClick={updatePassword}
              disabled={
                !confirmNewPassword || !newPassword || !currentPassworrd
              }
            >
              {!saveBtnLoader ? <AppLoader /> : "Update Password"}
            </button>
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

export default YourPassword;



