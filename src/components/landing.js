import React, { useState, useContext } from "react";
import Typed from "react-typed";
import NotificationBanner from "./presentation/notification";
import "../styles/app.scss";
import Button from "./presentation/button";
import Register from "./register";
import Login from "./login";
import Spinner from "./presentation/spinner";
import NotificationContext from "../context/notification/notification-context";

const LandingPage = () => {
  const { isVisible, isLoginSelected, setIsLoginSelected, isSpinnerVisible } = useContext(NotificationContext);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(100);
  const [rightPanelWidth, setRightPanelWidth] = useState(0);
  const [blockWidth, setBlockWidth] = useState(55);
  const [flipCartRotate, setFlipCartRotate] = useState(0);

  const setUserLoggedInStatus = (value) => {
    sessionStorage.setItem("isUserLoggedIn", value);
  };

  const handleButtonClick = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      setLeftPanelWidth(70);
      setRightPanelWidth(30);
      setBlockWidth((blockWidth * 70) / 100);
    }
  };

  const handleClose = () => {
    if (isButtonClicked) {
      setIsButtonClicked(false);
      setLeftPanelWidth(100);
      setRightPanelWidth(0);
      setBlockWidth(55);
      setIsLoginSelected(true);
      setFlipCartRotate(0);
    }
  };

  const handleRegister = () => {
    setIsLoginSelected(false);
    setFlipCartRotate(180);
  };

  const handleLogin = () => {
    setIsLoginSelected(true);
    setFlipCartRotate(0);
  };

  return (
    <>
      {isVisible && <NotificationBanner />}
      {isSpinnerVisible && <Spinner />}
      <div className="landing-container" style={{ width: `${leftPanelWidth}vw` }}>
        <div className="landing-container-layer">
          <div className="landing-container_block" style={{ width: `${blockWidth}vw` }}>
            <div className="landing-container_block-title">
              PORT<span style={{ color: "#388697" }}>F</span>OLIO
            </div>
            <div className="landing-container_block-subtitle">create and deploy portfolio with</div>
            <div className="landing-container_block-subtitle" style={{ fontWeight: 500 }}>
              <Typed strings={["Ease", "Free of cost", "Secure"]} typeSpeed={95} backSpeed={95} loop></Typed>
            </div>
            <div className="landing-container_block-subtitle">
              <Button name="Login/Register" clickCallBack={() => handleButtonClick()} />
            </div>
          </div>
        </div>
      </div>
      {isButtonClicked && (
        <div className="login-container" style={{ width: `${rightPanelWidth}vw` }}>
          <div className="outer">
            <div className="inner">
              <label className="close" onClick={() => handleClose()}>
                Close
              </label>
            </div>
          </div>

          <div className="login-container_tablist">
            <div
              className="login-container_tablist-section"
              style={{ background: isLoginSelected ? "#388697" : "transparent", color: isLoginSelected ? "white" : "#388697" }}
              onClick={() => handleLogin()}
            >
              Login
            </div>
            <div
              className="login-container_tablist-section"
              style={{ background: !isLoginSelected ? "#388697" : "transparent", color: !isLoginSelected ? "white" : "#388697" }}
              onClick={() => handleRegister()}
            >
              Register
            </div>

            <div className="flip-card">
              <div className="flip-card-inner" style={{ transform: `rotateY(${flipCartRotate}deg)` }}>
                <div className="flip-card-front">{isLoginSelected && <Login setUserLoggedInStatus={setUserLoggedInStatus} />}</div>
                <div className="flip-card-back">{!isLoginSelected && <Register />}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
