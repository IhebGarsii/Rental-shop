import React, { useEffect, useState } from "react";
import "./notification.css";
import {
  getAdminNotifications,
  getNotifications,
  postRead,
} from "../../apis/notificationApi";
import NotificationRow from "../notificationRow/NotificationRow";
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
function Notification() {
  const [displayNotification, setDisplayNotification] = useState(false);
  const [badge, setBadge] = useState();
  const handlePostRead = async () => {
    setDisplayNotification(!displayNotification);
    const response = await postRead(localStorage.getItem("idUser"));
    setBadge(0);
  };

  const { data: notification, isSuccess } = useQuery({
    queryKey: ["notification"],
    queryFn: () => {
      if (localStorage.getItem("roles") === "ADMIN") {
        return getAdminNotifications();
      } else {
        return getNotifications(localStorage.getItem("idUser"));
      }
    },
  });
  useEffect(() => {
    if (isSuccess && notification) {
      console.log(notification.i);
      setBadge(notification.i); // Make sure notification.i exists
    }
  }, [notification]);

  return (
    <div onClick={handlePostRead} className="notification-component">
      <div className="noti-display">
        <FaBell icon={FaBell} />
        <h4 className="notification-name" id="notification-name">
          Notification
        </h4>
      </div>
      {badge > 0 && <div className="badge"> {badge} </div>}
      {displayNotification && (
        <div className="notification-list">
          {notification.notification &&
            notification.notification
              .slice()
              .reverse()
              .map((noti) => (
                <NotificationRow key={noti._id} notification={noti} />
              ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
