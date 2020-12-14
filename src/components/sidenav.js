import React, { useState, useEffect, useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SideNav = () => {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  const { setIsSpinnerVisible, setNotificationMessage, setIsVisible } = useContext(NotificationContext);
  const [isCaretClicked, setIsCaretClicked] = useState(false);
  const [uploadImageClicked, setUploadImageClicked] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userDetail.profileImageId) {
      setIsSpinnerVisible(true);
      fetchProfileImageId(userDetail.profileImageId, true);
    }
  }, []);

  const deletePreviousImageId = () => {
    fetch(`http://localhost:4000/image/attachment/${userDetail.profileImageId}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((res) => console.log(res))
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong!! Try again after sometime.");
        console.error(err);
      });
  };

  const fetchProfileImageId = (profileImageId, onFirstLoad = false) => {
    fetch(`http://localhost:4000/image/attachment/file/${profileImageId}`)
      .then((res) => res.blob())
      .then((res) => {
        const urlCreator = window.URL || window.webkitURL;
        setImage(urlCreator.createObjectURL(res));
        setIsSpinnerVisible(false);
        if (!onFirstLoad) {
          setIsCaretClicked(false);
          setUploadImageClicked(false);
          setIsVisible(true);
          setNotificationMessage("Profile Image has been uploaded successfully");
        }
      })
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong!! Try again after sometime.");
        setIsSpinnerVisible(false);
        console.error(err);
      });
  };

  const updateProfileImageId = (email, profileImageId) => {
    fetch(`http://localhost:4000/user/image/${email}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileImageId }),
    })
      .then((res) => res.json())
      .then((res) => {
        const profileImageId = res.profileImageId;
        const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
        const newUserDetail = {
          email: userDetail.email,
          firstName: userDetail.firstName,
          lastName: userDetail.lastName,
          profileName: userDetail.profileName,
          profileImageId,
        };
        sessionStorage.setItem("userDetail", JSON.stringify(newUserDetail));
        fetchProfileImageId(profileImageId);
      })
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong!! Try again after sometime.");
        setIsSpinnerVisible(false);
        console.error(err);
      });
  };

  const handleUploadFile = (e) => {
    setIsSpinnerVisible(true);

    if (userDetail.profileImageId) {
      deletePreviousImageId();
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    fetch("http://localhost:4000/image/attachment/file", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const profileImageId = res[0].id;
        const email = userDetail.email;
        updateProfileImageId(email, profileImageId);
      })
      .catch((err) => {
        setIsVisible(true);
        setNotificationMessage("Something went wrong!! Try again after sometime.");
        setIsSpinnerVisible(false);
        console.error(err);
      });
  };

  return (
    <div className="sidenav">
      <div className="sidenav_admin">
        portfolio<span style={{ fontWeight: "normal" }}>portal</span>
      </div>
      <div className="sidenav_image">
        <img src={image} alt="img" className="sidenav_image-img" />
      </div>

      <div className="sidenav_profileName">
        {userDetail.firstName} {userDetail.lastName} ({userDetail.profileName}){" "}
        <span
          className="sidenav_profileName-caret"
          onClick={() => {
            setIsCaretClicked(!isCaretClicked);
            setIsVisible(false);
            setNotificationMessage("");
            if (!isCaretClicked) {
              setUploadImageClicked(false);
            }
          }}
        >
          {isCaretClicked ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </div>

      {isCaretClicked && (
        <div className="sidenav_imageOptions">
          <ul>
            <li
              onClick={() => {
                setUploadImageClicked(!uploadImageClicked);
              }}
            >
              Upload Image
            </li>
            <li>Delete Image</li>
          </ul>
        </div>
      )}

      {uploadImageClicked && isCaretClicked && (
        <div className="sidenav_uploadImage">
          <form>
            <label htmlFor="avatar" className="uploadLabel">
              Choose a profile picture:
            </label>
            <input type="file" id="avatar" className="inputForm" accept="image/*" onChange={(e) => handleUploadFile(e)} />
          </form>
        </div>
      )}
    </div>
  );
};

export default SideNav;
