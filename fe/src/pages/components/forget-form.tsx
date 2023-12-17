import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CALL_POST_API } from "src/api";
import AppLoader from "./utility/loader";
import AppNotification, { getErrorNotification } from "./utility/notification";

const forgetForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isThrowigEvent, setIsThrowigEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(true);
  const [confirmShowPassword, setconfirmShowPassword] = useState(true);
  const [notification, setNotification] = useState({});

  const passwordToogle = (e: any) => {
    if (e == "confirmPasswordInput") {
      setconfirmShowPassword(!confirmShowPassword);
    } else if (e == "PasswordInput") {
      setshowPassword(!showPassword);
    }
  };

  const forgotPassword = async () => {
    try {
      setIsLoading(true);
      const { success } = await CALL_POST_API("auth/forget-password", {
        email,
      });
      setIsLoading(false);
      if (success) {
        setIsThrowigEvent(true);
        setNotification({});
      } else {
        setNotification(getErrorNotification("Enter valid email"));
      }
    } catch (err) {}
  };

  const verifyOtp = async () => {
    if (password === ConfirmPassword) {
      try {
        setIsLoading(true);
        const { success } = await CALL_POST_API("auth/verify-otp", {
          email,
          otp,
          password,
        });
        setIsLoading(false);
        if (success) {
          router.push("/");
        } else {
          setNotification(getErrorNotification("Enter valid OTP"));
        }
      } catch (err) {}
    } else {
      setNotification(getErrorNotification("Please enter above password"));
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isThrowigEvent) {
        verifyOtp();
      } else {
        forgotPassword();
      }
    }
  };

  return (
    <div className="login-form pt-28">
      <h1 className="text-2xl text-black">Forgot Password</h1>
      {!isThrowigEvent ? (
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Enter email or user name"
            maxLength={50}
          />

          <div className="pt-8">
            <button
              className="app-button"
              onClick={forgotPassword}
              disabled={!email}
            >
              <div className="border-none text-white">
                {isLoading ? <AppLoader /> : "Send link"}
              </div>
            </button>
            <AppNotification notification={notification} />
          </div>
        </div>
      ) : (
        <></>
      )}

      {isThrowigEvent ? (
        <div>
          <input
            type="text"
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Enter OTP"
            maxLength={4}
          />

          <div className="background-light forgetPdiv flex items-center justify-between rounded-lg">
            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              maxLength={30}
            />

            <div>
              <FiEyeOff
                className="mr-4 eye-icon"
                onClick={() => passwordToogle("PasswordInput")}
                style={{
                  display: showPassword ? "block" : "none",
                  width: "14px",
                }}
              />
              <FiEye
                className="mr-4 eye-icon"
                onClick={() => passwordToogle("PasswordInput")}
                style={{
                  display: showPassword ? "none" : "block",
                  width: "14px",
                }}
              />
            </div>
          </div>

          <div className="background-light forgetPdiv flex items-center justify-between rounded-lg">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={confirmShowPassword ? "password" : "text"}
              placeholder="Confirm Password"
              maxLength={30}
            />

            <div>
              <FiEyeOff
                className="mr-4 eye-icon"
                onClick={() => passwordToogle("confirmPasswordInput")}
                style={{
                  display: confirmShowPassword ? "block" : "none",
                  width: "14px",
                }}
              />
              <FiEye
                className="mr-4 eye-icon"
                onClick={() => passwordToogle("confirmPasswordInput")}
                style={{
                  display: confirmShowPassword ? "none" : "block",
                  width: "14px",
                }}
              />
            </div>
          </div>

          <button
            className="app-button mt-8"
            onClick={verifyOtp}
            disabled={!password || !otp || !ConfirmPassword}
          >
            <div className="border-none text-white">
              {isLoading ? <AppLoader /> : "Set Password"}
            </div>
          </button>
          <AppNotification notification={notification} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default forgetForm;
