import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { setRead } from "../../../functions/notification";

export default function NotificationMenu({
  notifications,
  id,
  token,
  getNotifications,
}) {
  const reacts = ["Like", "Love", "Angry", "Haha", "Sad", "Wow"];
  const setReadNotificaion = async (idNotification) => {
    try {
      await setRead(idNotification, token).then(getNotifications());
    } catch (error) {
      console.error("Error while setting read:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="mmenu_notification scrollbar">
      <h2>Notifications</h2>
      <div className="mmenu_splitter"></div>
      {notifications?.length != 0 ? (
        notifications.map((notification, i) => (
          <>
            <Link
              onClick={() => {
                setReadNotificaion(notification?._id);
              }}
              to={notification?.link}
              className="mmenu_item hover3"
              key={i}
            >
              <div
                className={` ${
                  notification?.read ? "profile_link" : "profile_link_active"
                } `}
              >
                <div className="circle_icon_notification">
                  <img src={notification?.senderRef.picture} alt="" />
                  <div className="right_bottom_notification">
                    {reacts.includes(notification?.type) ? (
                      <img
                        src={`../../../../reacts/${notification?.type}.svg`}
                        alt=""
                      />
                    ) : (
                      <i className={`${notification?.type}_icon`}></i>
                    )}
                  </div>
                </div>
                <p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${notification?.description}`,
                    }}
                  />

                  <div
                    className={` ${
                      notification?.read
                        ? "notification_privacy_date"
                        : "notification_privacy_date_active"
                    } `}
                  >
                    <Moment fromNow interval={30}>
                      {notification?.createdAt}
                    </Moment>
                  </div>
                </p>
              </div>
              <div
                className={` ${
                  notification?.read ? "" : "notification_icon_active "
                } `}
                style={{width: "12px"}}
              />

            </Link>
          </>
        ))
      ) : (
        <div className="mmenu_item  imgNotification">
          <img src="../../../../images/notification.png" alt="" />
        </div>
      )}
    </div>
  );
}
