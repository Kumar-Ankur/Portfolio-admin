import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SideNav = () => {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  const [isCaretClicked, setIsCaretClicked] = useState(false);
  return (
    <div className="sidenav">
      <div className="sidenav_admin">
        portfolio<span style={{ fontWeight: "normal" }}>portal</span>
      </div>
      <div className="sidenav_image">
        <img src="" alt="img" className="sidenav_image-img" />
      </div>

      <div className="sidenav_profileName">
        {userDetail.firstName} {userDetail.lastName} ({userDetail.profileName}){" "}
        <span className="sidenav_profileName-caret" onClick={() => setIsCaretClicked(!isCaretClicked)}>
          {isCaretClicked ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </div>

      {isCaretClicked && (
        <div className="sidenav_imageOptions">
          <ul>
            <li>Upload Image</li>
            <li>Change Image</li>
            <li>Delete Image</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideNav;
