import React from "react";

const Dashboard = () => {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  return (
    <h1>
      Welcome {userDetail.firstName} {userDetail.lastName} ({userDetail.profileName})
    </h1>
  );
};

export default Dashboard;
