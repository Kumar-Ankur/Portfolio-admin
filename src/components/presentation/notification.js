import React, { useContext } from "react";
import { RiNotification2Fill } from "react-icons/ri";
import NotificationContext from "../../context/notification/notification-context";

const NotificationBanner = () => {
  const { message, setIsVisible, emptyNotificationMessage } = useContext(NotificationContext);
  return (
    <>
      <div className="notification_banner">
        <span>
          <span className="notification_banner-icon">
            <RiNotification2Fill />
          </span>
          {message}
        </span>
        <span
          className="notification_banner-close"
          onClick={() => {
            setIsVisible(false);
            emptyNotificationMessage();
          }}
        >
          X
        </span>
      </div>
    </>
  );
};

export default NotificationBanner;
