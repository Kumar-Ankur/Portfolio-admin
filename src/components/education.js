import React, { useContext, useEffect, useState } from "react";
import Button from "./presentation/button";
import NotificationContext from "../context/notification/notification-context";
import FadeLoader from "react-spinners/FadeLoader";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FaSchool } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Education = () => {
  const { setNotificationMessage, setIsVisible } = useContext(NotificationContext);
  const user = JSON.parse(sessionStorage.getItem("userDetail"));
  const [noEducation, setNoEducation] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisisble] = useState(true);
  const [isAddEducationClicked, setIsAddEducationClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [board, setBoard] = useState("");
  const [year, setYear] = useState("");
  const [percentage, setPercentage] = useState("");
  const [educationId, setEducationId] = useState("");
  const [educationDetail, setEducationDetail] = useState([]);

  const getEducationDetail = () => {
    setIsSpinnerVisisble(true);
    fetch(`http://localhost:4000/education/${user.profileName}`)
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisisble(false);
        if (res.status === "fail") {
          setNoEducation(true);
        } else {
          setEducationDetail(res.education.education);
          setIsVisible(true);
          setNotificationMessage(res.message);
        }
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
      });
  };

  useEffect(() => {
    getEducationDetail();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinnerVisisble(true);

    const payload = {
      degree,
      institution,
      board,
      year,
      percentage,
    };

    if (isEditClicked && educationId) {
      fetch(`http://localhost:4000/education/${user.profileName}/${educationId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsSpinnerVisisble(false);
          setIsVisible(true);
          setNotificationMessage(res.message);
          setDegree("");
          setInstitution("");
          setYear("");
          setPercentage("");
          setBoard("");
          setIsEditClicked(false);
          getEducationDetail();
        })
        .catch((err) => {
          setIsSpinnerVisisble(false);
          setIsVisible(true);
          setNotificationMessage("Something went wrong, please try after sometime.");
        });
    } else {
      fetch(`http://localhost:4000/education/${user.profileName}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsSpinnerVisisble(false);
          setIsVisible(true);
          setNotificationMessage(res.message);
          setDegree("");
          setInstitution("");
          setYear("");
          setPercentage("");
          setBoard("");
          setIsAddEducationClicked(false);
          getEducationDetail();
        })
        .catch((err) => {
          setIsSpinnerVisisble(false);
          setIsVisible(true);
          setNotificationMessage("Something went wrong, please try after sometime.");
        });
    }
  };

  const deleteEducation = (id) => {
    setIsSpinnerVisisble(true);
    fetch(`http://localhost:4000/education/${user.profileName}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisisble(false);
        setIsVisible(true);
        setNotificationMessage(res.message);
        getEducationDetail();
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
        setIsVisible(true);
        setNotificationMessage("Something went wrong, please try after sometime.");
      });
  };

  const editEducation = (education) => {
    const { degree, institution, board, year, percentage, _id } = education;
    setIsEditClicked(true);
    setDegree(degree);
    setInstitution(institution);
    setBoard(board);
    setYear(year);
    setPercentage(percentage);
    setEducationId(_id);
  };

  const deleteProfileEducation = () => {
    setIsSpinnerVisisble(true);
    fetch(`http://localhost:4000/education/${user.profileName}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisisble(false);
        setIsVisible(true);
        setNotificationMessage(res.message);
        getEducationDetail();
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
        setIsVisible(true);
        setNotificationMessage("Something went wrong, please try after sometime.");
      });
  };

  return (
    <div className="education">
      {isSpinnerVisible && (
        <div className="permissionSpinner">
          <div className="permissionSpinner_loading">
            <FadeLoader />
          </div>
        </div>
      )}

      {!isAddEducationClicked && !isEditClicked && (
        <div className="education_addEducation" onClick={() => setIsAddEducationClicked(true)}>
          <AiOutlinePlusCircle /> <span>Add Education</span>
        </div>
      )}

      {!isAddEducationClicked && !isEditClicked && educationDetail.length > 0 && (
        <div className="education_deleteEducation" onClick={() => deleteProfileEducation()}>
          <MdDelete /> <span>Delete Education</span>
        </div>
      )}

      {noEducation && !isAddEducationClicked && !isEditClicked && <div className="education_noeducation">No Education Detail found</div>}

      {!isAddEducationClicked && !isEditClicked && !noEducation && (
        <div className="education_table">
          {educationDetail.map((education, index) => {
            return (
              <div className="education_detail" key={index}>
                <div className="education_detail-firstrow">
                  <span>
                    <FaSchool />
                  </span>
                  <span className="education_detail-firstrow-degree">{education.degree}</span>
                  <span className="education_detail-firstrow-hyphen">-</span>
                  <span className="education_detail-firstrow-board">{education.board}</span>
                  <span className="education_detail-firstrow-edit" onClick={() => editEducation(education)}>
                    <BiEdit />
                  </span>
                  <span className="education_detail-firstrow-delete" onClick={() => deleteEducation(education._id)}>
                    <AiOutlineDelete />
                  </span>
                </div>

                <div className="education_detail-secondrow">
                  <span className="education_detail-secondrow-institution">{education.institution}</span>
                  <span className="education_detail-secondrow-year">Year: {education.year}</span>
                  <span className="education_detail-secondrow-percentage">Percentage: {education.percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(isAddEducationClicked || isEditClicked) && (
        <div className="education_modal">
          <span className="education_modal-cross" onClick={() => setIsAddEducationClicked(false)}>
            <ImCross />
          </span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="group">
              <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Degree</label>
            </div>

            <div className="group">
              <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Institution</label>
            </div>

            <div className="group">
              <input type="text" value={board} onChange={(e) => setBoard(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Board</label>
            </div>

            <div className="group">
              <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Year</label>
            </div>

            <div className="group">
              <input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className="group_text">Percentage</label>
            </div>

            {degree && institution && board && year && percentage && <Button type="submit" name={isEditClicked ? "Edit" : "Add"} />}
          </form>
        </div>
      )}
    </div>
  );
};

export default Education;
