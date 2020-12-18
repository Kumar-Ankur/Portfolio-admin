import React, { useContext } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
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
  const { selected_option, SetSelectedOption } = useContext(NotificationContext);

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

  const handleNextContent = () => {
    if (selected_option === "Introduction") {
      SetSelectedOption("About");
    } else if (selected_option === "About") {
      SetSelectedOption("Education");
    } else if (selected_option === "Education") {
      SetSelectedOption("Official Project");
    } else if (selected_option === "Official Project") {
      SetSelectedOption("Personal Project");
    } else if (selected_option === "Personal Project") {
      SetSelectedOption("Blogs");
    } else if (selected_option === "Blogs") {
      SetSelectedOption("Awards/Certification");
    } else if (selected_option === "Awards/Certification") {
      SetSelectedOption("Contact us");
    }
  };

  const handlePreviousContent = () => {
    if (selected_option === "Contact us") {
      SetSelectedOption("Awards/Certification");
    } else if (selected_option === "Awards/Certification") {
      SetSelectedOption("Blogs");
    } else if (selected_option === "Blogs") {
      SetSelectedOption("Personal Project");
    } else if (selected_option === "Personal Project") {
      SetSelectedOption("Official Project");
    } else if (selected_option === "Official Project") {
      SetSelectedOption("Education");
    } else if (selected_option === "Education") {
      SetSelectedOption("About");
    } else if (selected_option === "About") {
      SetSelectedOption("Introduction");
    }
  };

  return (
    <>
      {selected_option !== "Profile Setting" && selected_option !== "Inbox" && selected_option !== "Notification" ? (
        <div className="container_navigation">
          {selected_option !== "Introduction" ? (
            <div className="container_navigation-back" onClick={() => handlePreviousContent()}>
              <span className="container_navigation-back_icon">
                <AiOutlineDoubleLeft />
              </span>
              Previous
            </div>
          ) : null}
          {selected_option !== "Contact us" ? (
            <div className="container_navigation-next" onClick={() => handleNextContent()}>
              Next
              <span className="container_navigation-next_icon">
                <AiOutlineDoubleRight />
              </span>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className="container_content">{renderedProps()}</div>
    </>
  );
};

export default Container;
