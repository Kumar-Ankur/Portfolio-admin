import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NotificationContext from "../context/notification/notification-context";
import Button from "./presentation/button";

const Register = () => {
  const { setNotificationMessage, setIsVisible, setIsSpinnerVisible } = useContext(NotificationContext);
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [progressWidth, setProgressWidth] = useState(10);
  const [progressColor, setProgressColor] = useState("red");
  const [progressText, setProgressText] = useState("Too weak");
  const [isVerified, setIsVerified] = useState(true);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (pass) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const pass_regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    return pass_regex.test(String(pass));
  };

  const validateAndSetPassword = (e) => {
    setPassword(e.target.value);
    checkProgressBar(e.target.value);
    if (validatePassword(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
      setConfirmPassword("");
    }
  };

  const checkProgressBar = (pass) => {
    const hasNumber = (value) => {
      return new RegExp(/[0-9]/).test(value);
    };
    const hasMixed = (value) => {
      return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
    };
    const hasSpecial = (value) => {
      return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
    };

    if (pass.length < 3) {
      setProgressWidth(10);
      setProgressColor("red");
      setProgressText("Too weak");
    } else if (
      (pass.length >= 3 && pass.length < 5 && hasMixed(pass)) ||
      (pass.length >= 3 && pass.length < 5 && hasNumber(pass)) ||
      (pass.length >= 3 && pass.length < 5 && hasSpecial(pass))
    ) {
      setProgressWidth(20);
      setProgressColor("orange");
      setProgressText("Weak");
    } else if (
      (pass.length >= 5 && pass.length < 8 && hasMixed(pass) && hasSpecial(pass)) ||
      (pass.length >= 5 && pass.length < 8 && hasNumber(pass) && hasSpecial(pass)) ||
      (pass.length >= 5 && pass.length < 8 && hasMixed(pass) && hasNumber(pass))
    ) {
      setProgressWidth(30);
      setProgressColor("lightgreen");
      setProgressText("Strong");
    } else if (pass.length >= 8 && hasMixed(pass) && hasSpecial(pass) && hasNumber(pass)) {
      setProgressWidth(40);
      setProgressColor("green");
      setProgressText("Very Strong");
    }
  };
  const validateAndSetConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setIsPasswordMatch(true);
    } else {
      setIsPasswordMatch(false);
    }
  };

  const checkAndSetEmail = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVisible(false);
    setIsSpinnerVisible(true);

    if (isRegisterVisible) {
      fetch("http://localhost:4000/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName: fname, lastName: lname, email, password }),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsSpinnerVisible(false);
          setNotificationMessage(res.message);
          setIsVisible(true);
          if (res.status === "success") {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }
        })
        .catch((err) => console.log(err));
    } else if (isVerified) {
      fetch("http://localhost:4000/user/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsSpinnerVisible(false);
          if (res.verifyEmail && res.verifyEmail.status === "In_Active") {
            setIsVerified(true);
            setIsRegisterVisible(false);
            setNotificationMessage(res.message);
            setIsVisible(true);
          } else if (res.verifyEmail && res.verifyEmail.status === "active") {
            setIsRegisterVisible(true);
            setNotificationMessage(res.message);
            setIsVisible(true);
          } else if (!res.status) {
            setIsVerified(false);
            setIsRegisterVisible(false);
            setNotificationMessage(res.message);
            setIsVisible(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      fetch("http://localhost:4000/user/request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsSpinnerVisible(false);
          if (res.status && res.status === "fail") {
            setIsVerified(true);
            setIsRegisterVisible(false);
            setNotificationMessage(res.message);
            setIsVisible(true);
          } else {
            setIsVerified(true);
            setIsRegisterVisible(false);
            setNotificationMessage(res.message);
            setIsVisible(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="group">
        <input type="text" value={fname} onChange={(e) => setFirstName(e.target.value)} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="group_text">First Name</label>
      </div>

      <div className="group">
        <input type="text" value={lname} onChange={(e) => setLastName(e.target.value)} />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="group_text">Last Name</label>
      </div>

      <div className="group">
        <input type="email" value={email} onChange={(e) => checkAndSetEmail(e)} />
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

        <input type={isEyeVisible ? "text" : "password"} value={password} onChange={(e) => validateAndSetPassword(e)} />
        {isHintVisible && (
          <span className="hintText">
            Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
          </span>
        )}
        <span className="highlight"></span>
        <span className="bar"></span>
        <div
          className="mark exclamation-point"
          onMouseOver={() => {
            setIsHintVisible(true);
          }}
          onMouseLeave={() => setIsHintVisible(false)}
        ></div>
        <label className="group_text">Password</label>
        {password !== "" && (
          <>
            <span className="error">Password Strength:</span>
            <span className="progress_bar" style={{ width: `${progressWidth}%`, background: progressColor }}></span>
            <span className="bar_message" style={{ color: progressColor }}>
              {progressText}
            </span>
          </>
        )}
      </div>

      {isPasswordValid && password !== "" && (
        <div className="group">
          <input type="text" value={cpassword} onChange={(e) => validateAndSetConfirmPassword(e)} />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label className="group_text">Confirm Password</label>
          {!isPasswordMatch && <span className="error">Password does not match</span>}
        </div>
      )}

      {fname !== "" && lname !== "" && email !== "" && password !== "" && cpassword !== "" && isEmailValid && isPasswordValid && isPasswordMatch && (
        <Button name={isRegisterVisible ? "Sign up" : isVerified ? "Verify" : "Request"} type="submit" />
      )}
    </form>
  );
};

export default Register;
