import React, { useContext } from "react";
import Spinner from "./presentation/spinner";
import NotificationBanner from "./presentation/notification";
import NotificationContext from "../context/notification/notification-context";
import SideNav from "./sidenav";
import Header from "./header";
import Heading from "./heading";
import Content from "./content";

const Dashboard = () => {
  const { isSpinnerVisible, isVisible } = useContext(NotificationContext);
  return (
    <>
      {isSpinnerVisible && <Spinner />}
      {isVisible && <NotificationBanner />}
      <SideNav />
      <Header />
      <Heading />
      <Content />
    </>
  );
};

export default Dashboard;
