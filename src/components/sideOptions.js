import React from "react";
import { GrOverview } from "react-icons/gr";
import {
  AiOutlineInsertRowAbove,
  AiOutlineFundProjectionScreen,
  AiOutlineProject,
  AiOutlineMoneyCollect,
  AiOutlineContacts,
  AiOutlineBook,
} from "react-icons/ai";
import { FiAward } from "react-icons/fi";

const SideOption = () => {
  return (
    <div className="sidenav_section">
      <div className="sidenav_section-lists">
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <GrOverview />
          </span>
          Introduction
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineInsertRowAbove />
          </span>
          About
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineMoneyCollect />
          </span>
          Education
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineFundProjectionScreen />
          </span>
          Official Project
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineProject />
          </span>
          Personal Project
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <AiOutlineBook />
          </span>
          Blogs
        </div>
        <div className="sidenav_section-lists_list">
          <span className="sidenav_section-lists_list-icon">
            <FiAward />
          </span>
          Awards/Certification
        </div>
        <div className="sidenav_section-lists_list">
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
