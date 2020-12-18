import React, { useContext } from "react";
import Spinner from "./presentation/spinner";
import NotificationBanner from "./presentation/notification";
import NotificationContext from "../context/notification/notification-context";
import SideNav from "./sidenav";
import Header from "./header";
import Heading from "./heading";
import Content from "./content";
import { Redirect } from "react-router-dom";

const Dashboard = () => {
  const { isSpinnerVisible, isVisible, resetDefaultState } = useContext(NotificationContext);
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn") || false;

  const handleLogout = () => {
    sessionStorage.removeItem("isUserLoggedIn");
    sessionStorage.removeItem("userDetail");
    resetDefaultState();
  };

  return (
    <>
      {isUserLoggedIn ? (
        <>
          {isSpinnerVisible && <Spinner />}
          {isVisible && <NotificationBanner />}
          <SideNav />
          <Header handleLogout={handleLogout} />
          <Heading />
          <Content />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Dashboard;
