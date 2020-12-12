import React from "react";
import { Redirect } from "react-router-dom";
import LandingPage from "./components/landing";

const App = () => {
  const isUseuLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  return <div>{isUseuLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}</div>;
};

export default App;
