import React, { useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import ProfileImage from "./profileImage";
import SideOption from "./sideOptions";

const SideNav = () => {
  const { side_nav_open } = useContext(NotificationContext);
  return (
    <div className="sidenav" style={{ width: side_nav_open ? "13rem" : "5rem" }}>
      {side_nav_open ? (
        <div className="sidenav_admin">
          portfolio<span style={{ fontWeight: "normal" }}>portal</span>
        </div>
      ) : (
        <div className="sidenav_admin">
          p<span style={{ fontWeight: "normal" }}>p</span>
        </div>
      )}
      <ProfileImage />
      <SideOption />
    </div>
  );
};

export default SideNav;
