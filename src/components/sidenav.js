import React, { useState, useEffect, useContext } from "react";
import NotificationContext from "../context/notification/notification-context";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SideNav = () => {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail")) || {};
  const { setIsSpinnerVisible } = useContext(NotificationContext);
  const [isCaretClicked, setIsCaretClicked] = useState(false);
  const [uploadImageClicked, setUploadImageClicked] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userDetail.profileImageId) {
      setIsSpinnerVisible(true);
      fetch(`http://localhost:4000/image/attachment/file/${userDetail.profileImageId}`)
        .then((res) => res.blob())
        .then((res) => {
          const urlCreator = window.URL || window.webkitURL;
          setImage(urlCreator.createObjectURL(res));
          setIsSpinnerVisible(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleUploadFile = (e) => {
    setIsSpinnerVisible(true);
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
            fetch(`http://localhost:4000/image/attachment/file/${profileImageId}`)
              .then((res) => res.blob())
              .then((res) => {
                const urlCreator = window.URL || window.webkitURL;
                setImage(urlCreator.createObjectURL(res));
                setIsSpinnerVisible(false);
                setIsCaretClicked(false);
                setUploadImageClicked(false);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
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
        <span className="sidenav_profileName-caret" onClick={() => setIsCaretClicked(!isCaretClicked)}>
          {isCaretClicked ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </div>

      {isCaretClicked && (
        <div className="sidenav_imageOptions">
          <ul>
            <li onClick={() => setUploadImageClicked(!uploadImageClicked)}>Upload Image</li>
            <li>Change Image</li>
            <li>Delete Image</li>
          </ul>
        </div>
      )}

      {uploadImageClicked && (
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
