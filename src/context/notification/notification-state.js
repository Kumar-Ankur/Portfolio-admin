import React, { useReducer } from "react";
import NotificationContext from "./notification-context";
import NotificationReducer from "./notification-reducer";

const NotificationState = (props) => {
  const initialState = {
    message: "",
    isVisible: false,
    isLoginSelected: true,
  };

  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  const setNotificationMessage = (message) => {
    dispatch({
      type: "SET_NOTIFICATION_MESSAGE",
      payload: message,
    });
  };

  const emptyNotificationMessage = () => {
    dispatch({
      type: "EMPTY_NOTIFICATION_MESSAGE",
    });
  };

  const setIsVisible = (value) => {
    dispatch({
      type: "SET_IS_VISIBLE",
      payload: value,
    });
  };

  const setIsLoginSelected = (value) => {
    dispatch({
      type: "SET_IS_LOGIN_SELECTED",
      payload: value,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        message: state.message,
        isVisible: state.isVisible,
        isLoginSelected: state.isLoginSelected,
        setNotificationMessage,
        emptyNotificationMessage,
        setIsVisible,
        setIsLoginSelected,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationState;
