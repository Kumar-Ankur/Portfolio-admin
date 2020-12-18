import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { CgPushChevronLeftO, CgPushChevronRightO } from "react-icons/cg";
import NotificationContext from "../context/notification/notification-context";

const Header = ({ handleLogout }) => {
  const { setSideNavOpen, side_nav_open, SetSelectedOption } = useContext(NotificationContext);

  return (
    <h1 className={side_nav_open ? "header_sideNavOpen" : "header_sideNavClose"}>
      <span className="header_hamburger" onClick={() => setSideNavOpen(!side_nav_open)}>
        {side_nav_open ? <CgPushChevronLeftO /> : <CgPushChevronRightO />}
      </span>

      <span className="header_setting" onClick={() => SetSelectedOption("Profile Setting")}>
        <AiOutlineSetting />
      </span>

      <span className="header_logout" onClick={() => handleLogout()}>
        <FiLogOut />
      </span>
    </h1>
  );
};

export default Header;
