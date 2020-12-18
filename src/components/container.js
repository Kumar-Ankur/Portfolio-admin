import React, { useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import Introduction from "./introduction";
import About from "./about";
import Education from "./education";
import OfficialProject from "./officialproject";
import PersonalProject from "./personalproject";
import Blog from "./blog";
import Award from "./award";
import Contact from "./contact";
import Setting from "./setting";
import Inbox from "./inbox";
import Notification from "./notification";

const Container = () => {
  const { selected_option } = useContext(NotificationContext);

  const renderedProps = () => {
    switch (selected_option) {
      case "Introduction":
        return <Introduction />;

      case "About":
        return <About />;

      case "Education":
        return <Education />;

      case "Official Project":
        return <OfficialProject />;

      case "Personal Project":
        return <PersonalProject />;

      case "Blogs":
        return <Blog />;

      case "Awards/Certification":
        return <Award />;

      case "Contact us":
        return <Contact />;

      case "Profile Setting":
        return <Setting />;

      case "Inbox":
        return <Inbox />;

      case "Notification":
        return <Notification />;

      default:
        return <Introduction />;
    }
  };
  return <>{renderedProps()}</>;
};

export default Container;
