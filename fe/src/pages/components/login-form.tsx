import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { CALL_POST_API, CALL_GET_API } from "src/api";
import Cookies from "js-cookie";

import AppLoader from "./utility/loader";
import AppNotification, { getErrorNotification } from "./utility/notification";

const LoginForm = () => {
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({});
  const [showPassword, setshowPassword] = useState(true);

  const router = useRouter();
  const passwordInputRef = useRef(null);

  const passwordToogle = (e: any) => {
    console.log(e);
    setshowPassword(!showPassword);
  };

  const user = async () => {
    if (Cookies.get("token")) {
    }
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        const user_Data = data.data;
        return user_Data.provider;
      }
    } catch (err) {}
  };

  const login = async () => {
    setIsLoading(true);
    try {
      const { success, data } = await CALL_POST_API("auth/login", {
        user_name,
        password,
      });
      if (success) {
        Cookies.set("token", data.access_token);
        const isProvider = await user();
        if (isProvider) {
          router.push("/check-schedule");
        } else {
          router.push("/dashboard");
        }
      } else {
        setNotification(getErrorNotification("Invalid username or password"));
      }
    } catch (err) {
      setNotification(getErrorNotification("Invalid username or password"));
    }
    setIsLoading(false);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="login-form pt-16">
      <h1 className="text-2xl text-black">Sign in</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Enter email or user name"
        maxLength={50}
      />

      <div className="background-light forgetPdiv flex items-center justify-between rounded-lg">
        <input
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={passwordInputRef}
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

      <div className="pt-4 text-gray-100">
        <Link
          href="/forget"
          className="forget-btn border-none text-sm text-lightgray"
        >
          Forget password
        </Link>
      </div>
      <div className="pt-8">
        <button
          onClick={login}
          className="app-button"
          disabled={!user_name || !password}
        >
          <div className="border-none text-white">
            {isLoading ? <AppLoader /> : "Login"}
          </div>
        </button>
      </div>
      <AppNotification notification={notification} />
    </div>
  );
};

export default LoginForm;
