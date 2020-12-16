import React, { useContext } from "react";
import { BsPerson } from "react-icons/bs";
import {
  AiOutlineInsertRowAbove,
  AiOutlineFundProjectionScreen,
  AiOutlineProject,
  AiOutlineMoneyCollect,
  AiOutlineContacts,
  AiOutlineBook,
} from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import NotificationContext from "../context/notification/notification-context";

const SideOption = () => {
  const { SetSelectedOption, selected_option } = useContext(NotificationContext);
  return (
    <div className="sidenav_section">
      <div className="sidenav_section-lists">
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Introduction" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Introduction" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Introduction")}
        >
          {selected_option === "Introduction" ? <span className="sidenav_section-lists_list-border_intro"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <BsPerson />
          </span>
          Introduction
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{ color: selected_option === "About" ? "#388697" : "#9b9b9b", fontWeight: selected_option === "About" ? "bold" : "normal" }}
          onClick={() => SetSelectedOption("About")}
        >
          {selected_option === "About" ? <span className="sidenav_section-lists_list-border_about"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineInsertRowAbove />
          </span>
          About
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Education" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Education" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Education")}
        >
          {selected_option === "Education" ? <span className="sidenav_section-lists_list-border_education"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineMoneyCollect />
          </span>
          Education
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Official Project" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Official Project" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Official Project")}
        >
          {selected_option === "Official Project" ? <span className="sidenav_section-lists_list-border_oproject"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineFundProjectionScreen />
          </span>
          Official Project
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Personal Project" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Personal Project" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Personal Project")}
        >
          {selected_option === "Personal Project" ? <span className="sidenav_section-lists_list-border_pproject"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineProject />
          </span>
          Personal Project
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{ color: selected_option === "Blogs" ? "#388697" : "#9b9b9b", fontWeight: selected_option === "Blogs" ? "bold" : "normal" }}
          onClick={() => SetSelectedOption("Blogs")}
        >
          {selected_option === "Blogs" ? <span className="sidenav_section-lists_list-border_blog"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineBook />
          </span>
          Blogs
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Awards/Certification" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Awards/Certification" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Awards/Certification")}
        >
          {selected_option === "Awards/Certification" ? <span className="sidenav_section-lists_list-border_award"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <FiAward />
          </span>
          Awards/Certification
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Contact us" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Contact us" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Contact us")}
        >
          {selected_option === "Contact us" ? <span className="sidenav_section-lists_list-border_contact"></span> : null}
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineContacts />
          </span>
          Contact us
        </div>
      </div>
    </div>
  );
};

export default SideOption;
