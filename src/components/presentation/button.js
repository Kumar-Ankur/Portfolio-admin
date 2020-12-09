import React from "react";

const Button = ({ name, clickCallBack, disabled = false }) => {
  return (
    <button className="primary_button" onClick={clickCallBack} disabled={disabled}>
      <span className="primary_button-text">{name}</span>
    </button>
  );
};

export default Button;
