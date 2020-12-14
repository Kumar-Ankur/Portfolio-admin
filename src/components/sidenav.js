import React from "react";
import ProfileImage from "./profileImage";
import SideOption from "./sideOptions";

const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="sidenav_admin">
        portfolio<span style={{ fontWeight: "normal" }}>portal</span>
      </div>
      <ProfileImage />
      <SideOption />
    </div>
  );
};

export default SideNav;
