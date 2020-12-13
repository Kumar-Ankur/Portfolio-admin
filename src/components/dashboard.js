import React, { useContext } from "react";
import Spinner from "./presentation/spinner";
import NotificationContext from "../context/notification/notification-context";
import SideNav from "./sidenav";
import Header from "./header";
import Heading from "./heading";
import Content from "./content";

const Dashboard = () => {
  const { isSpinnerVisible } = useContext(NotificationContext);
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  return (
    <>
      {isSpinnerVisible && <Spinner />}
      <SideNav />
      <Header />
      <Heading />
      <Content />
    </>
  );
};

export default Dashboard;
