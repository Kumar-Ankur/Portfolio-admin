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
  const { SetSelectedOption, selected_option, side_nav_open } = useContext(NotificationContext);
  return (
    <div className="sidenav_section" style={{ width: side_nav_open ? "11rem" : "3rem", top: side_nav_open ? "13rem" : "10rem" }}>
      <div className="sidenav_section-lists" style={{ width: side_nav_open ? "12rem" : "0rem" }}>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Introduction" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Introduction" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Introduction")}
        >
          {selected_option === "Introduction" ? (
            <span className="sidenav_section-lists_list-border_intro" style={{ top: side_nav_open ? "-0.2rem" : "0rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <BsPerson />
          </span>
          {side_nav_open ? "Introduction" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{ color: selected_option === "About" ? "#388697" : "#9b9b9b", fontWeight: selected_option === "About" ? "bold" : "normal" }}
          onClick={() => SetSelectedOption("About")}
        >
          {selected_option === "About" ? (
            <span className="sidenav_section-lists_list-border_about" style={{ top: side_nav_open ? "3.8rem" : "4.4rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineInsertRowAbove />
          </span>
          {side_nav_open ? "About" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Education" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Education" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Education")}
        >
          {selected_option === "Education" ? (
            <span className="sidenav_section-lists_list-border_education" style={{ top: side_nav_open ? "7.8rem" : "8.8rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineMoneyCollect />
          </span>
          {side_nav_open ? "Education" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Official Project" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Official Project" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Official Project")}
        >
          {selected_option === "Official Project" ? (
            <span className="sidenav_section-lists_list-border_oproject" style={{ top: side_nav_open ? "11.8rem" : "13.3rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineFundProjectionScreen />
          </span>
          {side_nav_open ? "Official Project" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Personal Project" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Personal Project" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Personal Project")}
        >
          {selected_option === "Personal Project" ? (
            <span className="sidenav_section-lists_list-border_pproject" style={{ top: side_nav_open ? "15.8rem" : "17.8rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineProject />
          </span>
          {side_nav_open ? "Personal Project" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{ color: selected_option === "Blogs" ? "#388697" : "#9b9b9b", fontWeight: selected_option === "Blogs" ? "bold" : "normal" }}
          onClick={() => SetSelectedOption("Blogs")}
        >
          {selected_option === "Blogs" ? (
            <span className="sidenav_section-lists_list-border_blog" style={{ top: side_nav_open ? "19.8rem" : "22.3rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineBook />
          </span>
          {side_nav_open ? "Blogs" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Awards/Certification" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Awards/Certification" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Awards/Certification")}
        >
          {selected_option === "Awards/Certification" ? (
            <span className="sidenav_section-lists_list-border_award" style={{ top: side_nav_open ? "23.8rem" : "26.8rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <FiAward />
          </span>
          {side_nav_open ? "Awards/Certification" : ""}
        </div>
        <div
          className="sidenav_section-lists_list"
          style={{
            color: selected_option === "Contact us" ? "#388697" : "#9b9b9b",
            fontWeight: selected_option === "Contact us" ? "bold" : "normal",
          }}
          onClick={() => SetSelectedOption("Contact us")}
        >
          {selected_option === "Contact us" ? (
            <span className="sidenav_section-lists_list-border_contact" style={{ top: side_nav_open ? "27.8rem" : "31.3rem" }}></span>
          ) : null}
          <span className="sidenav_section-lists_list-icon" style={{ fontSize: side_nav_open ? "1rem" : "1.3rem" }}>
            <AiOutlineContacts />
          </span>
          {side_nav_open ? "Contact us" : ""}
        </div>
      </div>
    </div>
  );
};

export default SideOption;
