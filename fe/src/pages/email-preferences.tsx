import { useRouter } from "next/router";
import AppLoader from "./components/utility/loader";
import React, { useEffect, useState } from "react";
import Layout from "./components/layout";
import { CALL_GET_API, CALL_POST_API } from "@/api";
import Cookies from "js-cookie";
import AppNotification, { getSuccessNotification } from "./components/utility/notification";

const EmailPreferences = () => {
  const router = useRouter();
  const [newPopUpFeatures, setNewPopUpFeatures] = useState(false);
  const [weeklyEventGuide, setWeeklyEventGuide] = useState(false);
  const [allPopUpNewsletters, setAllPopUpNewsletters] = useState(false);
  const [anOrganizer, setAnOrganizer] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState(false);
  const [featuresAndAnnouncements, setFeaturesAndAnnouncements] =
    useState(false);
  const [monthlyTipsAndTools, setMonthlyTipsAndTools] = useState(false);
  const [EventSalesRecap, setEventSalesRecap] = useState(false);
  const [PopUpNewsLettersAndUpdates, setPopUpNewsLettersAndUpdates] =
    useState(false);
  const [orderconfirmations, setOrderconfirmations] = useState(false);
  const [importantReminders, setImportantReminders] = useState(false);
  const [updateBtnLoader, setUpdateBtnLoader] = useState(true);
  const [loader, setLoader] = useState(false);
  const [notification, setNotification] = useState({});


  const updatePreferences = async () => {
    setUpdateBtnLoader(false);

    const body = {
      preferences: {
        attending: {
          email: { newPopUpFeatures, weeklyEventGuide, allPopUpNewsletters },
          notification: { anOrganizer, upcomingEvents },
        },
        organizing: {
          email: {
            featuresAndAnnouncements,
            monthlyTipsAndTools,
            EventSalesRecap,
            PopUpNewsLettersAndUpdates,
          },
          notification: {
            orderconfirmations,
            importantReminders,
          },
        },
      },
    };

    const { success, data } = await CALL_POST_API(
      "user/update-email-preferences",
      body
    );
    if (success) {
      console.log(data);
      setUpdateBtnLoader(true);
      setNotification(
        getSuccessNotification("Preferences Updated Successfully.")
      );
      user();
    }
    setUpdateBtnLoader(true);
  };

  const user = async () => {
    setLoader(true);
    if (Cookies.get("token")) {
    }
    try {
      const { success, data } = await CALL_GET_API("user/user-by-id");
      if (success) {
        const user_Data = data.data;
        const preferences_attending_email =
          user_Data.preferences.attending.email;
        const preferences_attending_notification =
          user_Data.preferences.attending.notification;
        const preferences_organizing_email =
          user_Data.preferences.organizing.email;
        const preferences_organizing_notification =
          user_Data.preferences.organizing.notification;
        setNewPopUpFeatures(preferences_attending_email.newPopUpFeatures);
        setWeeklyEventGuide(preferences_attending_email.weeklyEventGuide);
        setAllPopUpNewsletters(preferences_attending_email.allPopUpNewsletters);
        setAnOrganizer(preferences_attending_notification.anOrganizer);
        setUpcomingEvents(preferences_attending_notification.upcomingEvents);
        setFeaturesAndAnnouncements(
          preferences_organizing_email.featuresAndAnnouncements
        );
        setMonthlyTipsAndTools(
          preferences_organizing_email.monthlyTipsAndTools
        );
        setEventSalesRecap(preferences_organizing_email.EventSalesRecap);
        setPopUpNewsLettersAndUpdates(
          preferences_organizing_email.PopUpNewsLettersAndUpdates
        );
        setOrderconfirmations(
          preferences_organizing_notification.orderconfirmations
        );
        setImportantReminders(
          preferences_organizing_notification.importantReminders
        );
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
        <>

          <div className="setting-notify">
            <AppNotification notification={notification} />
          </div>
          <div className="text-white setting-head">Email Preferences</div>
          <div className="text-white">Attending Events</div>
          <div className="text-xs text-white my-3 font-light">
            News and updates about events created by event organizers
          </div>
          <div className="text-xs text-white mb-1">Email Me</div>

          <div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox1"
                type="checkbox"
                value=""
                checked={newPopUpFeatures}
                onChange={(e: any) => setNewPopUpFeatures(e.target.checked)}
              />
              <label htmlFor="link-checkbox1">
                Updates about new Popup features and announcements
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox2"
                type="checkbox"
                value=""
                checked={weeklyEventGuide}
                onChange={(e: any) => setWeeklyEventGuide(e.target.checked)}
              />
              <label htmlFor="link-checkbox2">
                Popup’s weekly event guide: A digest of personalized event
                recommendations
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox3"
                type="checkbox"
                value=""
                checked={allPopUpNewsletters}
                onChange={(e: any) =>
                  setAllPopUpNewsletters(e.target.checked)
                }
              />
              <label htmlFor="link-checkbox3">
                Unsubscribe from all Popup newsletters and updates for
                attendees
              </label>
            </div>
          </div>
          <div className="text-xs text-white mt-3">Notifications</div>
          <div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox4"
                type="checkbox"
                value=""
                checked={anOrganizer}
                onChange={(e: any) => setAnOrganizer(e.target.checked)}
              />
              <label htmlFor="link-checkbox4">
                When an organizer you follow announces a new event
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox5"
                type="checkbox"
                value=""
                checked={upcomingEvents}
                onChange={(e: any) => setUpcomingEvents(e.target.checked)}
              />
              <label htmlFor="link-checkbox5">
                Reminders on upcoming events you are attending
              </label>
            </div>
          </div>
          <div className="text-white my-3">Organizing Events</div>
          <div
            className="text-white font-light mb-3"
            style={{ fontSize: "10px" }}
          >
            Helpful updates and tips for organizing events on Popup
          </div>
          <div className="text-xs text-white mb-1">Email Me</div>

          <div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox6"
                type="checkbox"
                value=""
                checked={featuresAndAnnouncements}
                onChange={(e: any) =>
                  setFeaturesAndAnnouncements(e.target.checked)
                }
              />
              <label htmlFor="link-checkbox6">
                Updates about new Popup features and announcements
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox7"
                type="checkbox"
                value=""
                checked={monthlyTipsAndTools}
                onChange={(e: any) =>
                  setMonthlyTipsAndTools(e.target.checked)
                }
              />
              <label htmlFor="link-checkbox7">
                Monthly tips and tools for organizing events
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox8"
                type="checkbox"
                value=""
                checked={EventSalesRecap}
                onChange={(e: any) => setEventSalesRecap(e.target.checked)}
              />
              <label htmlFor="link-checkbox8">Event Sales Recap</label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox9"
                type="checkbox"
                value=""
                checked={PopUpNewsLettersAndUpdates}
                onChange={(e: any) =>
                  setPopUpNewsLettersAndUpdates(e.target.checked)
                }
              />
              <label htmlFor="link-checkbox9">
                Unsubscribe from all Popup newsletters and updates for event
                organizers
              </label>
            </div>
          </div>
          <div className="text-xs text-white mt-3">Notifications</div>
          <div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox10"
                type="checkbox"
                value=""
                checked={orderconfirmations}
                onChange={(e: any) => setOrderconfirmations(e.target.checked)}
              />
              <label htmlFor="link-checkbox10">
                Order confirmations from my attendees
              </label>
            </div>
            <div className="flex items-center termsCon my-1.5	">
              <input
                id="link-checkbox11"
                type="checkbox"
                value=""
                checked={importantReminders}
                onChange={(e: any) => setImportantReminders(e.target.checked)}
              />
              <label htmlFor="link-checkbox11">
                Important reminders for my next event
              </label>
            </div>
          </div>
          <button
            className="change-btn"
            onClick={updatePreferences}
            style={{ marginBottom: "0" }}
          >
            {/* Update */}
            {!updateBtnLoader ? <AppLoader /> : "Update Preferences"}
          </button>
          <div className="text-white setting-head mt-5">Payout Details</div>
          <div className="text-white">Connect PayPal Account</div>
          <div className="flex paypal-btn justify-center items-center mt-5">
            <img
              src={`${router.basePath}/assets/images/paypal.png`}
              className="w-4 h-4 mr-2"
              alt=""
            />
            <div className="text-black text-lg">Log in with PayPal</div>
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

export default EmailPreferences;



