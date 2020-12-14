import React from "react";
import ProfileImage from "./profileImage";

const SideNav = () => {
  return (
    <div className="sidenav">
      <div className="sidenav_admin">
        portfolio<span style={{ fontWeight: "normal" }}>portal</span>
      </div>
      <ProfileImage />
    </div>
  );
};

export default SideNav;
