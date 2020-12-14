import React, { useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import { BiPlusCircle } from "react-icons/bi";

const Heading = () => {
  const { selected_option } = useContext(NotificationContext);
  return (
    <div className="heading">
      <div className="heading_title">{selected_option}</div>
      <div className="heading_breadcumb">
        <span>{"Home > "}</span>
        <span style={{ fontWeight: "bold", color: "#388697" }}>{selected_option}</span>
      </div>

      <div className="heading_createNew">
        <button className="heading_createNew_button">
          <span className="heading_createNew_button-icon">
            <BiPlusCircle />
          </span>
          Create New
        </button>
      </div>
    </div>
  );
};

export default Heading;
