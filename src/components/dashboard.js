import React from "react";
import SideNav from "./sidenav";
import Header from "./header";
import Heading from "./heading";
import Content from "./content";

const Dashboard = () => {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  return (
    <>
      <SideNav />
      <Header />
      <Heading />
      <Content />
    </>
  );
};

export default Dashboard;
