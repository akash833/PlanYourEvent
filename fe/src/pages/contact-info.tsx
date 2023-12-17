import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import { useRouter } from "next/router";
import { CALL_GET_API, CALL_POST_API, POST_MEDIA } from "@/api";
import AppLoader from "src/pages/components/utility/loader";
import AppNotification from "./components/utility/notification";
import { getSuccessNotification } from "./components/utility/notification";
import Cookies from "js-cookie";

const setting = () => {
  const router = useRouter();
  const [imgLoad, setImgLoad] = useState(false)
  const [image, setImage] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [userData, setUserData] = useState("");
  const [changeBtnLoaderNumber, setChangeBtnLoaderNumber] = useState(true);
  const [notification, setNotification] = useState({});
  const [changeEmail, setChangeEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [contact_number, setContact_number] = useState("");


  

 

  const userImage = async (e: any) => {
    setImgLoad(true)
    document.getElementById("profileImg")?.click();
    const formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    const uploaded = await POST_MEDIA("util/image", formdata);
    setImage(uploaded.data.url);
    setImgLoad(false);
    console.log(userDetails, userData, changeEmail)
  };

  const changeImg = async (e: any) => {
    console.log(e);
    setChangeBtnLoaderNumber(false);
    const { success, data } = await CALL_POST_API("user/update-contact-image", {
      image,
      contact_number,
    });
    if (success) {
      console.log(data);
      setChangeBtnLoaderNumber(true);
      setNotification(getSuccessNotification("Profile Updated Successfully."));
      user();
    }
  };

  const user = async () => {
    setLoader(true);
    if (Cookies.get("token")) {
    }
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        const user_Data = data.data;
        setUserData(user_Data._id);
        setEmail(user_Data.email);
        setUserDetails(user_Data);
        setChangeEmail(user_Data.email);
        setImage(user_Data.image);
        setContact_number(user_Data.contact_number);

      }
    } catch (err) { }
    setLoader(false);
  };

  

  useEffect(() => {
    user();
  }, []);

  return (
    <Layout title="Settings | Popup" description="Settings | Popup">
      {!loader ? (
        <div>
          <div className="setting-notify">
            <AppNotification notification={notification} />
          </div>
          <div>
            <div className="text-white setting-head">Account information</div>
            <div className="text-white mb-4">Profile Photo</div>
            <div>
              <div style={{ display: imgLoad ? "block" : "none" }}>
                <AppLoader />
              </div>
              <div
                style={{ display: imgLoad ? "none" : "block" }}
                className="mb-4 cursor-pointer w-fit"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="userProfile object-cover"
                    onClick={() =>
                      document.getElementById("profileImg")?.click()
                    }
                  />
                ) : (
                  <img
                    src={`${router.basePath}/assets/images/ic_user.png`}
                    alt=""
                    className="userProfile object-cover"
                    onClick={() =>
                      document.getElementById("profileImg")?.click()
                    }
                  />
                )}
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              id="profileImg"
              onChange={userImage}
            />
            <div className="text-white">Contact Information</div>
            <div className="w-2/5 setting-input mb-4">
              <input type="text" value={email} placeholder="Email" />
              <input
                type="number"
                value={contact_number}
                placeholder="Contact Number"
                onChange={(e) => setContact_number(e.target.value)}
              />
            </div>
            <div
              className="change-btn flex justify-center items-center "
              onClick={changeImg}
            >
              {!changeBtnLoaderNumber ? <AppLoader /> : "Change"}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "20rem" }}
        >
          <AppLoader />
        </div>
      )}
    </Layout>
  );
};

export default setting;
