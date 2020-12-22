import React, { useState, useEffect, useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import FadeLoader from "react-spinners/FadeLoader";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const Notification = () => {
  const { setNotificationMessage, setIsVisible } = useContext(NotificationContext);
  const [isSpinnerVisible, setIsSpinnerVisisble] = useState(true);
  const [inActiveUser, setInActiveUser] = useState([]);
  const [allRequestUser, setAllRequestUser] = useState([]);
  const [isInActiveUserSelected, setInActiveUserSelected] = useState(true);
  const [inActiveUserObj, setInActiveUserObj] = useState({});

  const getInActiveUser = () => {
    setIsSpinnerVisisble(true);
    fetch("http://localhost:4000/user/getinactiveuser")
      .then((res) => res.json())
      .then((res) => {
        setInActiveUser(res);
        let inActiveObj = {};
        res.map((user) => {
          inActiveObj[user.email] = false;
        });
        setInActiveUserObj(inActiveObj);
        setIsSpinnerVisisble(false);
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
        console.log(err);
      });
  };

  const getAllRequestedUser = () => {
    setIsSpinnerVisisble(true);
    fetch("http://localhost:4000/user/getAllUser")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAllRequestUser(res);
        setIsSpinnerVisisble(false);
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getInActiveUser();
  }, []);

  const handleApproveRequest = (email) => {
    setIsSpinnerVisisble(true);
    fetch("http://localhost:4000/user/updatepermission", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, isAdmin: inActiveUserObj[email] }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsVisible(true);
        setNotificationMessage(res.message);
        setIsSpinnerVisisble(false);
        getInActiveUser();
      })
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong, please try after sometime");
        setIsSpinnerVisisble(false);
      });
  };

  const handleDeclinedRequest = (email) => {
    setIsSpinnerVisisble(true);
    fetch(`http://localhost:4000/user/declinePermission/${email}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsVisible(true);
        setNotificationMessage(res.message);
        setIsSpinnerVisisble(false);
        getInActiveUser();
      })
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong, please try after sometime");
        setIsSpinnerVisisble(false);
      });
  };

  return (
    <div>
      {isSpinnerVisible && (
        <div className="permissionSpinner">
          <div className="permissionSpinner_loading">
            <FadeLoader />
          </div>
        </div>
      )}

      {!isSpinnerVisible && (
        <>
          <div className="permission_toggle">
            <div
              className="permission_toggle-inactive"
              onClick={() => {
                if (!isInActiveUserSelected) {
                  setInActiveUserSelected(true);
                  getInActiveUser();
                  setIsVisible(false);
                  setNotificationMessage("");
                }
              }}
              style={{ color: isInActiveUserSelected ? "white" : "black", background: isInActiveUserSelected ? "#388697" : "white" }}
            >
              <span>InActive User</span>
            </div>
            <div
              className="permission_toggle-all"
              onClick={() => {
                if (isInActiveUserSelected) {
                  setInActiveUserSelected(false);
                  getAllRequestedUser();
                  setIsVisible(false);
                  setNotificationMessage("");
                }
              }}
              style={{ color: !isInActiveUserSelected ? "white" : "black", background: !isInActiveUserSelected ? "#388697" : "white" }}
            >
              <span>All Requested User</span>
            </div>
          </div>

          {inActiveUser.length === 0 && isInActiveUserSelected ? (
            <div className="permission_nocontent">No New Request Available</div>
          ) : isInActiveUserSelected ? (
            <div className="permission_allUser">
              <div className="permission_allUser-container">
                <ul className="responsive-table">
                  <li className="table-header">
                    <div className="col colm-1">Email</div>
                    <div className="col colm-2">Admin</div>
                    <div className="col colm-4">Approve/Decline</div>
                  </li>

                  {inActiveUser.map((user) => {
                    return (
                      <li className="table-row" key={user.email}>
                        <div className="col colm-1" data-label="Email">
                          {user.email}
                        </div>
                        <div className="col colm-2 form-check form-switch" data-label="admin">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="admin"
                            style={{ width: "50%" }}
                            onChange={(e) => {
                              setInActiveUserObj({ ...inActiveUserObj, [user.email]: e.target.checked });
                            }}
                          />
                        </div>
                        <div className="col colm-4 form-check form-switch" data-label="approve">
                          <span className="tick" onClick={() => handleApproveRequest(user.email)}>
                            <TiTick />
                          </span>
                          <span className="cross" onClick={() => handleDeclinedRequest(user.email)}>
                            <ImCross />
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : null}

          {!isInActiveUserSelected ? (
            <div className="permission_allUser">
              <div className="container">
                <ul className="responsive-table">
                  <li className="table-header">
                    <div className="col col-2">Email</div>
                    <div className="col col-3">Is Admin</div>
                    <div className="col col-4">Status</div>
                  </li>
                  {allRequestUser.map((user) => {
                    return (
                      <li className="table-row" key={user.email}>
                        <div className="col col-2" data-label="Email">
                          {user.email}
                        </div>
                        <div className="col col-3" data-label="isAdmin">
                          {user.isAdmin ? "Yes" : "No"}
                        </div>
                        <div className="col col-4" data-label="Status">
                          {user.status}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Notification;
