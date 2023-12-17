import { useRouter } from "next/router";
import { useEffect, type ReactNode, useState } from "react";
import { FiLogOut, FiX } from "react-icons/fi";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { CALL_GET_API, CALL_POST_API } from "src/api";
import AppLoader from "./utility/loader";
import Cookies from "js-cookie";
// import { useLocation } from "react-router-dom";
// import notification from "./utility/notification";
//import { socket } from '../../api/socket'

type ILayoutProps = {
  page?: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
};

const Layout = (props: ILayoutProps) => {
  const router = useRouter();
  const getPageName = () => {
    const pathName = router.pathname;

    if (pathName == "/dashboard") {
      return "Dashboard";
    }
    if (pathName == "/events") {
      return "Events";
    }
    if (pathName == "/newevent") {
      return "Add New";
    }
    if (pathName == "/order-list") {
      return "Order List";
    }
    if (pathName == "/contact-info") {
      return "Contact Info";
    }
    if (pathName == "/email-preferences") {
      return "Email Preferences";
    }
    if (pathName == "/password") {
      return "Password";
    }
    if (pathName == "/change-email") {
      return "Change Email";
    }

    if (pathName == "/billing-earning") {
      return "Billing/Earnings";
    }
    if (pathName == "/hire-event-staff") {
      return "Hire Event Staff";
    }
    if (pathName == "/check-schedule") {
      return "Check Schedule";
    }
    // if (pathName == "/transactions") {
    //   return "Transactions";
    // }
    return "";
  };

  const [userDetails, setUserDetails] = useState<any>({});
  const [activeTab, setActiveTab] = useState(getPageName());
  const [totalEvents, setTotalEvents] = useState(0);
  const [show, setShow] = useState(false);
  const [getNotification, setGetNotification] = useState([]);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [iconShow, setIconShow] = useState<boolean>();
  const [isProvider, setIsProvider] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  const [isShowChildDiv, setIsShowChildDiv] = useState(false);
  const [rotate, setRotate] = useState(false);
  const showPerPage = 3;

  const logOut = async () => {
    router.push("/");
    localStorage.clear();
    Cookies.remove("token");
    // console.log(pageTitle);
  };

  const getEventsWithoutPagi = async () => {
    if (!isProvider) {
      const { success, data } = await CALL_GET_API(
        "events/get-event-without-pagination"
      );
      console.log(success, setActiveTab);

      if (data && data.data) {
        setTotalEvents(data.data.length);
      }
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);
    getNotificationapi();
    const { success } = await CALL_POST_API(
      "notification/mark-notification?_id=" + user_id,
      {}
    );

    if (success) {
    }
  };

  const getNotificationapi = async () => {
    setLoading(true);
    const { data } = await CALL_GET_API("notification/");
    if (data) {
      const notification = data.data;
      const targetId = notification.targetId;
      console.log(targetId);
      setGetNotification(notification);
      console.log(notification);
      if (notification.length >= 1) {
        const lastObject = notification[notification.length - 1];
        setIconShow(lastObject.markAsRead);
      }
      setLoading(false);
    }
  };

  const user = async () => {
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        setUserDetails(data.data);
        setUser_id(data.data._id);
        setIsProvider(data.data.provider);
        Cookies.set("isProvider", data.data.provider);
      }
    } catch (err) {}
  };

  const getEvents = async () => {
    if (!isProvider) {
      const { success, data } = await CALL_POST_API("events/get-event", {
        page: 1,
        pageSize: showPerPage,
      });

      if (success) {
        setTotalEvents(data.totalEvents);
      }
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.push("/");
    }
    user();
    getEvents();
    getNotificationapi();
    getEventsWithoutPagi();
  }, []);

  const events = [
    {
      src: `${router.basePath}/assets/images/ic_dashboard.png`,
      name: "Dashboard",
      notify: "",
      forProvider: false,
    },
    {
      src: `${router.basePath}/assets/images/ic_calendar.png`,
      name: "Events",
      arrowSrc: `${router.basePath}/assets/images/ic_chevron_down.png`,
      notify: totalEvents,
      forProvider: false,
    },
    {
      src: "",
      name: "Add New",
      notify: "",
      forProvider: false,
    },
    {
      src: `${router.basePath}/assets/images/ic_dashboard.png`,
      name: "Check Schedule",
      notify: "",
      forProvider: true,
    },
    {
      src: "",
      name: "Order List",
      notify: "",
      forProvider: false,
    },
    {
      src: `${router.basePath}/assets/images/ic_setting.png`,
      name: "Settings",
      arrowSrc: `${router.basePath}/assets/images/ic_chevron.png`,
      notify: "",
      forProvider: isProvider,
      child: [
        {
          src: ``,
          name: "Contact Info",
          arrowSrc: ``,
          notify: "",
          forProvider: true,
        },
        {
          src: ``,
          name: "Email Preferences",
          arrowSrc: ``,
          notify: "",
          forProvider: true,
        },
        {
          src: ``,
          name: "Change Email",
          arrowSrc: ``,
          notify: "",
          forProvider: true,
        },
        {
          src: ``,
          name: "Password",
          arrowSrc: ``,
          notify: "",
          forProvider: true,
        },
      ],
    },
    {
      src: `${router.basePath}/assets/images/$.png`,
      name: "Billing/Earnings",
      notify: "",
      forProvider: false,
    },
    {
      src: `${router.basePath}/assets/images/$.png`,
      name: "Billing/Earnings",
      notify: "",
      forProvider: true,
    },
    {
      src: `${router.basePath}/assets/images/ic_user1.png`,
      name: "Hire Event Staff",
      notify: "",
      forProvider: false,
    },
    // {
    //   src: `${router.basePath}/assets/images/ic_dashboard.png`,
    //   name: "Transactions",
    //   notify: "",
    //   forProvider: isProvider,
    // },
  ];

  function handleClick(ev: any) {
    if (ev.name == "Add New") {
      router.push("/newevent");
    }
    if (ev.name == "Dashboard") {
      router.push("/dashboard");
    }
    if (ev.name == "Events") {
      router.push("/events");
    }
    if (ev.name == "Hire Event Staff") {
      router.push("/hire-event-staff");
    }
    if (ev.name == "Settings") {
      setIsShowChildDiv(!isShowChildDiv);
      setRotate(!rotate);
    }
    if (ev.name == "Contact Info") {
      router.push("/contact-info");
    }
    if (ev.name == "Email Preferences") {
      router.push("/email-preferences");
    }
    if (ev.name == "Password") {
      router.push("/password");
    }
    if (ev.name == "Change Email") {
      router.push("/change-email");
    }
    if (!isProvider) {
      if (ev.name == "Billing/Earnings") {
        router.push("/billing-earning");
      }
    }

    if (isProvider) {
      if (ev.name == "Billing/Earnings") {
        router.push("/billing-earning-2");
      }
    }

    if (ev.name == "Customer") {
      router.push("/customer-review");
    }

    if (ev.name == "Customer List") {
      router.push("/customer-list");
    }
    if (ev.name == "Order List") {
      router.push("/order-list");
    }
    if (ev.name == "Analytics") {
      router.push("/analytics");
    }
    if (ev.name == "Main Dashboard") {
      router.push("/main-dashboard");
    }
    if (ev.name == "Check Schedule") {
      router.push("/check-schedule");
    }
    // if (ev.name == "Transactions") {
    //   router.push("/transactions");
    // }
    document.body.style.overflow = "auto";
  }

  const menuBar = () => {
    setShowMenuBar(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setShowMenuBar(false);
    document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   user();
  // }, []);

  const getPageTitle = () => {
    if (props.title) {
      return props.title;
    } else {
      return "Dashboard";
    }
  };

  const getPageDescription = () => {
    if (props.description) {
      return props.description;
    } else {
      return "Dashboard page";
    }
  };

  return (
    // <MyContext.Provider value={{ innerSocket }}>

    <Main
      meta={<Meta title={getPageTitle()} description={getPageDescription()} />}
    >
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      {show && (
        <div className="notification-modal-overlay">
          <div className="notification-modal">
            <div className="flex delete-modal-buttons">
              <span className="text-white text-2xl font-extrabold">
                Notification
              </span>

              <img
                src={`${router.basePath}/assets/images/close-sm.png`}
                alt=""
                className="w-8 h-8 icon-close cursor-pointer"
                onClick={handleClose}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <AppLoader />
              </div>
            ) : getNotification.length === 0 ? (
              <div className="text-center text-white text-xs mt-5">
                No record found
              </div>
            ) : (
              <div>
                {getNotification?.map((e: any) => (
                  <div className="flex mt-3 gap-5">
                    {/* {e.img ? (
                    <img src={e.img} alt="" className="w-8 h-8 rounded-lg" />
                  ) : (
                    <img
                      src={`${router.basePath}/assets/images/profilePicture.png`}
                      alt=""
                      className="w-8 h-8"
                    />
                  )} */}
                    <div className="flex justify-between">
                      <div>
                        <div className="text-white text-base/7 text-sm">
                          {e.name}
                        </div>
                        <div className="notifi-desc">{e.description}</div>
                      </div>
                      <span className="notifi-date">{e.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container-fluid dashboard flex">
        <div
          className={`left w-1/5 layoutLeftDiv ${
            showMenuBar ? "menuBarToogle" : ""
          }`}
        >
          <div className="pl-8 text-white">
            <div>
              <FiX className="closeMenuBar" onClick={closeMenu} />
            </div>
            <img
              src={`${router.basePath}/assets/images/header.png`}
              alt="Dark logo"
              className=""
            />
            <div className="menu py-6 text-lg">Main menu </div>

            {events.map((ev) => (
              <div
                style={{
                  display: ev.forProvider === isProvider ? "block" : "none",
                }}
              >
                <div
                  className={`menu-div flex items-center justify-between pr-8 ${
                    activeTab === ev.name ? "activeTabsBorder" : ""
                  }`}
                  onClick={() => handleClick(ev)}
                >
                  <div className="flex items-center">
                    <div className="menu-img">
                      <img src={ev.src} />
                    </div>
                    <p className="ml-5">{ev.name}</p>
                    {/* <div className="badge-notification">{ev.notify}</div> */}

                    {ev.notify ? (
                      <div className="badge-notification">{ev.notify}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="menu-img">
                    <img src={ev.arrowSrc} alt="" />
                  </div>
                </div>
                <div>
                  {ev.child?.map((ec) => (
                    <div
                      // className="menu-div flex items-center justify-between pr-8"
                      className={`menu-div flex items-center justify-between pr-8 ${
                        activeTab === ec.name ? "activeTabsBorder" : ""
                      }`}
                      style={{ display: isShowChildDiv ? "block" : "none" }}
                      onClick={() => handleClick(ec)}
                    >
                      <div className="flex items-center">
                        <div className="menu-img">
                          <img src={ec.src} />
                        </div>
                        <p className="ml-5">{ec.name}</p>
                        {/* <div className="badge-notification">{ev.notify}</div> */}

                        {ev.notify ? (
                          <div className="badge-notification">{ec.notify}</div>
                        ) : (
                          <></>
                        )}
                      </div>
                      {/* <div className="menu-img">
                        <img src={ev.arrowSrc} alt="" />
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pop pt-12">POPUP LLC</div>
            <div className="pop pt-4">© 2023 All Rights Reserved</div>
          </div>
        </div>
        <div className="w-4/5 layoutRightDiv">
          <div className="top-header flex justify-between px-8 py-4">
            <div className="header-icons flex items-center">
              <img
                src={`${router.basePath}/assets/images/hamburgermenu.png`}
                onClick={menuBar}
                className="menuImgDash"
                alt=""
              />
              {getPageName()}
            </div>
            <div className="header-icons flex items-center">
              <img
                src={`${router.basePath}/assets/images/mainTitle.png`}
                className=""
                onClick={() => router.push("./contact-info")}
                alt=""
              />
              <div className="notification-bell">
                {!iconShow ? (
                  <>
                    <img
                      src={`${router.basePath}/assets/images/dotCounter.png`}
                      alt=""
                      className="dot-icon"
                    />
                  </>
                ) : (
                  <></>
                )}

                <img
                  src={`${router.basePath}/assets/images/ic_bell.png`}
                  alt=""
                  className="ic-bell-icon"
                  onClick={handleShow}
                />
              </div>

              {/* <img
                src={`${router.basePath}/assets/images/chat.png`}
                alt=""
                onClick={() => router.push("./chatBox")}
              /> */}

              <div className="notification-bell">
                <img
                  src={`${router.basePath}/assets/images/dotCounter.png`}
                  alt=""
                  className="dot-icon"
                />

                <img
                  src={`${router.basePath}/assets/images/messageBell.png`}
                  alt=""
                  className="ic-bell-icon"
                  onClick={() => router.push("./chatBox")}
                />
              </div>

              {/* <img
                  src={`${router.basePath}/assets/images/envelopeMail.png`}
                  alt=""
                /> */}
              {/* <img
                  src={userDetails?.image}
                  className="ml-3 rounded-lg object-cover"
                  alt=""
                /> */}
              {userDetails.image ? (
                <img
                  src={userDetails?.image}
                  className="ml-3 rounded-lg object-cover"
                  alt=""
                />
              ) : (
                <img
                  src={`${router.basePath}/assets/images/ic_user.png`}
                  className="ml-3 rounded-lg object-cover"
                  alt=""
                />
              )}

              <div className="user-name ml-2">{userDetails?.user_name}</div>
              {/* <img
                  // onClick={}
                  src={`${router.basePath}/assets/images/ic_chevron_down.png`}
                  className="chevron-down ml-3"
                  alt=""
                /> */}
              <div className="relative" onClick={logOut}>
                <FiLogOut
                  size={24}
                  className="w-4 cursor-pointer"
                  // onMouseLeave={mouseLeave}
                  // onMouseEnter={mouseEnter}
                />
                {/* <div className="text-xs hidden px-3 py-3 absolute" style={{display :mouseHover ? "none" : "block"}}>
                    log out
                  </div> */}
              </div>
            </div>
          </div>
          <div className="right-layout px-8 py-4 flex flex-col justify-between">
            {props.children}
          </div>
        </div>
      </div>
      {/* <script src="https://maps.googleapis.com/maps/api/js?key=process.env.API_KEY&libraries=places"></script> */}
    </Main>
    // </MyContext.Provider>
  );
};

export default Layout;
