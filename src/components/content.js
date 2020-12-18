import React, { useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import Container from "./container";
import News from "./news";
import Weather from "./weather";

const Content = () => {
  const { side_nav_open } = useContext(NotificationContext);
  return (
    <div className={side_nav_open ? "content_sideNavOpen" : "content_sideNavClose"}>
      <div className={side_nav_open ? "content_main_sideNavOpen" : "content_main_sideNavClose"}>
        <div className="content_main-section">
          <Container />
        </div>
        <div className="content_main-subsection">
          <div className="content_main-subsection_weather">
            <Weather />
          </div>
          <div className="content_main-subsection_news">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
