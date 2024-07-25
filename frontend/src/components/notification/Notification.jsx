import React, { useEffect, useState } from "react";
import "./notification.css";
import {
  getAdminNotifications,
  getNotifications,
  postRead,
} from "../../apis/notificationApi";
import NotificationRow from "../notificationRow/NotificationRow";
import { FaBell } from "react-icons/fa";
function Notification() {
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [badge, setBadge] = useState();
  const handlePostRead = async () => {
    setDisplayNotification(!displayNotification);
    const response = await postRead(localStorage.getItem("idUser"));
    setBadge(0);
  };
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        let notification;
        if (localStorage.getItem("roles") === "ADMIN") {
          console.log('eee')
          notification = await getAdminNotifications();
        } else {
          notification = await getNotifications(localStorage.getItem("idUser"));
        }
        console.log(notification)
        setNotification(notification.notification);
        setBadge(notification.i);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotification();
  }, []);
  return (
    <div onClick={handlePostRead} className="notification-component">
      <FaBell className="notification-icon" icon={FaBell} />
      {badge > 0 && <div className="badge"> {badge} </div>}
      {displayNotification && (
        <div className="notification-list">
          {notification &&
            notification
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
