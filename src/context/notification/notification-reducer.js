const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    case "EMPTY_NOTIFICATION_MESSAGE":
      return {
        ...state,
        message: "",
      };

    case "SET_IS_VISIBLE":
      return {
        ...state,
        isVisible: action.payload,
      };

    case "SET_IS_LOGIN_SELECTED":
      return {
        ...state,
        isLoginSelected: action.payload,
        isVisible: false,
        message: "",
      };

    default:
      return state;
  }
};

export default NotificationReducer;
