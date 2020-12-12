import React, { useContext } from "react";
import RingLoader from "react-spinners/RingLoader";
import NotificationContext from "../../context/notification/notification-context";

const Spinner = () => {
  const { isSpinnerVisible } = useContext(NotificationContext);
  return (
    <div className="spinner">
      <div className="spinner_block">
        <RingLoader size={100} color={"#388697"} loading={isSpinnerVisible} />
      </div>
    </div>
  );
};

export default Spinner;
