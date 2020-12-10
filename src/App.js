import React from "react";
import LandingPage from "./components/landing";
import NotificationState from "./context/notification/notification-state";

const App = () => {
  return (
    <div>
      <NotificationState>
        <LandingPage />
      </NotificationState>
    </div>
  );
};

export default App;
