import React, { useState, useEffect, useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import Button from "./presentation/button";
import FadeLoader from "react-spinners/FadeLoader";

const Setting = () => {
  const { setNotificationMessage, setIsVisible } = useContext(NotificationContext);
  const [isSpinnerVisible, setIsSpinnerVisisble] = useState(true);
  const [userDetail, setUserDetail] = useState({});
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLasttName, setUpdatedLasttName] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("userDetail"));

  const getUserDetail = () => {
    fetch(`http://localhost:4000/user/${user.profileName}`)
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisisble(false);
        setUserDetail(res.userDetail);
        setUpdatedFirstName(res.userDetail.firstName);
        setUpdatedLasttName(res.userDetail.lastName);
        const user = JSON.parse(sessionStorage.getItem("userDetail"));
        const updatedUser = {
          email: user.email,
          firstName: res.userDetail.firstName,
          lastName: res.userDetail.lastName,
          profileImageId: user.profileImageId,
          profileName: user.profileName,
        };
        sessionStorage.setItem("userDetail", JSON.stringify(updatedUser));
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
        setNotificationMessage(`unable to fetch profile data for this ${user.profileName}`);
        setIsVisible(true);
      });
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleEdit = () => {
    setIsEditClicked(!isEditClicked);
    setIsVisible(false);
    setNotificationMessage("");
  };

  const handleFirstName = (e) => {
    setIsVisible(false);
    setNotificationMessage("");
    if (isEditClicked) {
      setUpdatedFirstName(e.target.value);
    }
  };

  const handleLastName = (e) => {
    setIsVisible(false);
    setNotificationMessage("");
    if (isEditClicked) {
      setUpdatedLasttName(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditClicked) {
      setIsSpinnerVisisble(true);
      const payload = {
        firstName: updatedFirstName,
        lastName: updatedLasttName,
      };

      fetch(`http://localhost:4000/user/${userDetail.profileName}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsVisible(true);
          setNotificationMessage(res.message);
          getUserDetail();
        })
        .catch((err) => {
          setIsSpinnerVisisble(false);
          setIsVisible(true);
          setNotificationMessage("Something went wrong, try after sometime!!!");
        });
    }
  };

  return (
    <div>
      {isSpinnerVisible && (
        <div className="settingSpinner">
          <div className="settingSpinner_loading">
            <FadeLoader />
          </div>
        </div>
      )}
      {!isSpinnerVisible && (
        <div className="setting_container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="group">
              <input type="text" value={updatedFirstName} onChange={(e) => handleFirstName(e)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">First Name</label>
            </div>

            <div className="group">
              <input type="text" value={updatedLasttName} onChange={(e) => handleLastName(e)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Last Name</label>
            </div>

            <div className="group">
              <input type="text" value={userDetail.email} style={{ color: "#717171" }} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Email</label>
            </div>

            <div className="group">
              <input type="text" value={userDetail.profileName} style={{ color: "#717171" }} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Profile Name</label>
            </div>

            <Button type="submit" name={isEditClicked ? "Save" : "Edit"} clickCallBack={() => handleEdit()} />
          </form>
        </div>
      )}
    </div>
  );
};

export default Setting;
