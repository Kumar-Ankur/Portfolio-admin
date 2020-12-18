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

    case "SET_IS_LOADER_VISIBLE":
      return {
        ...state,
        isSpinnerVisible: action.payload,
      };

    case "SET_SELECTED_OPTION":
      return {
        ...state,
        selected_option: action.payload,
      };

    case "SET_SIDE_NAV_OPEN":
      return {
        ...state,
        side_nav_open: action.payload,
      };

    case "RESET_DEFAULT_STATE":
      return {
        ...state,
        message: "",
        isVisible: false,
        isLoginSelected: true,
        isSpinnerVisible: false,
        selected_option: "Introduction",
        side_nav_open: true,
      };

    default:
      return state;
  }
};

export default NotificationReducer;
