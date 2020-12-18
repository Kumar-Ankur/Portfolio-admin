import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "./presentation/button";
import { validateEmail } from "../utility";
import NotificationContext from "../context/notification/notification-context";

const Login = (props) => {
  const { setNotificationMessage, setIsVisible, setIsSpinnerVisible } = useContext(NotificationContext);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRedirect, setIsRedirect] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(false);

  const checkAndSetEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsSpinnerVisible(true);
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisible(false);
        if (res.status === "fail") {
          setNotificationMessage(res.message);
          setIsVisible(true);
        } else {
          sessionStorage.setItem("userDetail", JSON.stringify(res.userDetail));
          props.setUserLoggedInStatus(true);
          setNotificationMessage("");
          setIsVisible(false);
          setIsRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSpinnerVisible(false);
      });
  };

  return (
    <>
      {isRedirect ? (
        <Redirect to="/dashboard" />
      ) : (
        <form onSubmit={(e) => handleLoginSubmit(e)}>
          <div className="group">
            <input type="text" onChange={(e) => checkAndSetEmail(e)} value={email} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="group_text">Email</label>
            {!isEmailValid && <span className="error">Please enter a valid email address</span>}
          </div>

          <div className="group">
            {password !== "" && (
              <div className="eye_visible" onClick={() => setIsEyeVisible(!isEyeVisible)}>
                {isEyeVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            )}
            <input type={isEyeVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="group_text">Password</label>
          </div>

          {isEmailValid && email !== "" && password !== "" && <Button name="Proceed" type="submit" />}
        </form>
      )}
    </>
  );
};

export default Login;
