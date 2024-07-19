import React, { useEffect, useState } from "react";
import "./notification.css";
import { getNotifications, postRead } from "../../apis/notificationApi";
import NotificationRow from "../notificationRow/NotificationRow";
import { FaBell } from "react-icons/fa";
function Notification() {
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [badge, setBadge] = useState();
  const handlePostRead = async () => {
    setDisplayNotification(!displayNotification);
    const response = await postRead();
    setBadge(0);
  };
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const notification = await getNotifications();

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
