import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CALL_GET_API, CALL_POST_API, POST_MEDIA } from "src/api";
import { isValidEmail } from "@/utils/validator";
import Cookies from "js-cookie";
import AppLoader from "./utility/loader";
import AppNotification, { getErrorNotification } from "./utility/notification";

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [contact_number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [selectedTags, setSelectedTags] = useState<any>([]);
  const [provider, setThrowingEvent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState([]);
  const [showUserWarn, setshowUserWarn] = useState(true);
  const [location, setIsLocation] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [locations, setLocations] = useState([]);
  const [image, setImageURL] = useState("");
  const [showPassword, setshowPassword] = useState(true);
  const [confirmShowPassword, setconfirmShowPassword] = useState(true);
  const [notification, setNotification] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [validPassword, setValidPassword] = useState(false);

  const handleChecked = async (e: any) => {
    setThrowingEvent(e.target.checked);
    console.log(e.target.checked);
  };

  const handleBlur = () => {
    setIsValid(isValidEmail(email));
  };

  const passwordToogle = (e: any) => {
    if (e == "confirmPasswordInput") {
      setconfirmShowPassword(!confirmShowPassword);
    } else if (e == "PasswordInput") {
      setshowPassword(!showPassword);
    }
  };

  const checkUserName = async (e: any) => {
    try {
      console.log(e);
      const { success } = await CALL_POST_API("auth/check-user-name", {
        user_name,
      });
      if (!success) {
        setshowUserWarn(false);
      } else {
        setshowUserWarn(true);
      }
    } catch (err) {}
  };
  const selectServiceCategory = async (e: any) => {
    const selectedCategoryId = e.target.value;
    setSelectedServiceCategory(selectedCategoryId);

    const tagsForSelectedCategory = masterData.filter(
      (tag: any) => tag.type === "TAGS" && tag.parentId === selectedCategoryId
    );
    setFilteredTags(tagsForSelectedCategory);
    setSelectedTags([]);
  };

  const handleTagSelection = (tagId: any) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id: any) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const selectLocation = (e: any) => {
    setIsLocation(e.target.value);
  };

  const postImage = async (event: any) => {
    const formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    const uploaded = await POST_MEDIA("util/image", formdata);
    setImageURL(uploaded.data.url);
  };

  const register = async () => {
    if (password.length >= 8) {
      setValidPassword(false);
      if (password === confirm_password) {
        setIsLoading(true);
        try {
          const body = {
            email,
            user_name,
            contact_number,
            password,
            bio,
            location,
            service_category: selectedServiceCategory,
            tags: selectedTags,
            image,
            provider: !provider,
          };
          const { success, data } = await CALL_POST_API("auth/register", body);
          if (success) {
            if (!provider) {
              router.push("/check-schedule");
            } else {
              router.push("/dashboard");
            }
            Cookies.set("token", data.access_token);
          } else {
            setNotification(
              getErrorNotification("Unable to register , please try again")
            );
          }
        } catch (err) {}
        setIsLoading(false);
      } else {
        setNotification(
          getErrorNotification("Password and confirm password are not matching")
        );
      }
    } else {
      setValidPassword(true);
    }
  };

  const getServiceAndLocation = async () => {
    const { data } = await CALL_GET_API("master_data/all");
    const master = data.data;
    setMasterData(master);
    const services = master.filter((m: any) => m.type == "SERVICE_CATEGORY");
    setCategories(services);
    const locations = master.filter((m: any) => m.type == "LOCATIONS");
    setLocations(locations);
  };

  useEffect(() => {
    getServiceAndLocation();
  }, []);

  return (
    <>
      <h1 className="sign-head pt-16 text-2xl text-black">Sign Up</h1>
      <div className="signup-form-parent flex justify-between">
        <div className="signup-form">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter Email"
            onBlur={handleBlur}
            maxLength={50}
          />
          {isValid ? null : (
            <div className="w-4/5 float-right wrong-msg-div">
              <p className="wrong-msg text-left">Enter valid email</p>
            </div>
          )}
          <input
            onChange={(e) => setUserName(e.target.value)}
            onKeyUp={checkUserName}
            type="text"
            placeholder="@ Create username"
            maxLength={30}
          />
          {!showUserWarn ? (
            <div className="w-4/5 float-right wrong-msg-div">
              <p className="wrong-msg text-left">
                Username already taken by other user
              </p>
            </div>
          ) : (
            <></>
          )}
          <input
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            placeholder="Contact Number"
          />
          <div className="background-light width-100 flex items-center justify-between rounded-lg media-q-r">
            <input
              onChange={(e) => setPassword(e.target.value)}
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
          {validPassword ? (
            <div className="w-4/5 float-right wrong-msg-div">
              <p className="wrong-msg text-left">
                Password should be atleast 8 charcters
              </p>
            </div>
          ) : (
            <></>
          )}

          <div className="background-light width-100 flex items-center justify-between rounded-lg media-q-r">
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
        </div>
        <div className="signup-form sign-sec">
          <div className="my-6 mb-0  flex gap-2 py-3">
            <input
              className="form-check-input checkBox"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              onChange={handleChecked}
              checked={provider}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Are you registering for Popup to throw events?
            </label>
          </div>
          {!provider ? (
            <div>
              <div className="with-icon service-dropdown relative flex justify-between">
                <select
                  id="dropdown"
                  onChange={selectServiceCategory}
                  placeholder="Service Category"
                  value={selectedServiceCategory}
                >
                  <option value="">Select Service Category</option>
                  {categories.map((ev: any) => (
                    <option key={ev._id} value={ev._id}>
                      {ev.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="width-100 flex w-4/5 flex-wrap">
                {filteredTags.map((tag: any) => (
                  <div
                    key={tag._id}
                    className={`selectSC mr-2 mt-6 flex items-center ${
                      selectedTags.includes(tag._id) ? "selected-tag" : ""
                    }`}
                    onClick={() => handleTagSelection(tag._id)}
                  >
                    {selectedTags.includes(tag._id) ? (
                      <img
                        className="mr-1 h-4 w-4"
                        src={`${router.basePath}/assets/images/label2.png`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="mr-1 h-4 w-4"
                        src={`${router.basePath}/assets/images/label.png`}
                        alt=""
                      />
                    )}

                    <p
                      className={`tag-name ${
                        selectedTags.includes(tag._id)
                          ? "selected-tag-name"
                          : ""
                      }`}
                    >
                      {tag.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="with-icon service-dropdown relative flex justify-between">
                <select
                  id="dropdown"
                  onChange={selectLocation}
                  placeholder="Location"
                  value={location}
                >
                  <option value="">Select Location</option>
                  {locations.map((ev: any) => (
                    <option value={ev._id}>{ev.name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <></>
          )}

          <textarea
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />

          <input
            id="fileUpload"
            type="file"
            placeholder={image || "headshot photo"}
            onChange={postImage}
            style={{ display: "none" }}
          />
          {!image ? (
            <div
              onClick={() => document.getElementById("fileUpload")?.click()}
              className="service-dropdown imgeUpload flex justify-between px-6 py-3 pr-3"
            >
              headshot photo
              <img
                src={`${router.basePath}/assets/images/camera.png`}
                alt=""
                className="h-4 w-5 cursor-pointer"
              />
            </div>
          ) : (
            <div className="service-dropdown secImgDiv flex items-center justify-between px-6 py-3 pr-3">
              <img src={image} className="h-7 w-7" alt="" />

              <img
                onClick={() => document.getElementById("fileUpload")?.click()}
                src={`${router.basePath}/assets/images/camera.png`}
                alt=""
                className="h-4 w-5 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-16 text-center">
        <button
          className="register-btn"
          disabled={
            !email ||
            !user_name ||
            !contact_number ||
            !password ||
            !confirm_password
          }
          onClick={register}
        >
          <div className="app-button">
            {isLoading ? <AppLoader /> : "Register"}
          </div>
        </button>
        <div className="register-btn p-0 text-center">
          <AppNotification notification={notification} />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
