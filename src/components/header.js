import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";

const Header = () => {
  return (
    <h1 className="header">
      <span className="header_hamburger">
        <GiHamburgerMenu />
      </span>

      <span className="header_setting">
        <AiOutlineSetting />
      </span>

      <span className="header_logout">
        <FiLogOut />
      </span>
    </h1>
  );
};

export default Header;
