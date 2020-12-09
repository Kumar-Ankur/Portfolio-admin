import React, { useState } from "react";
import Button from "./presentation/button";

const Register = () => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");

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
    if (validatePassword(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
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

  return (
    <form>
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
        <input type="password" value={password} onChange={(e) => validateAndSetPassword(e)} />
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
      </div>

      <div className="group">
        <input type="text" />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label className="group_text">Confirm Password</label>
        {!isPasswordMatch && <span className="error">Password does not match</span>}
      </div>

      <Button name="Sign Up" />
    </form>
  );
};

export default Register;
