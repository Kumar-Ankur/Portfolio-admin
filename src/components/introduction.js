import React, { useState, useEffect, useContext } from "react";
import Button from "./presentation/button";
import NotificationContext from "../context/notification/notification-context";
import FadeLoader from "react-spinners/FadeLoader";
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineAppstoreAdd } from "react-icons/ai";
import { ImCross } from "react-icons/im";

const Introduction = () => {
  const { setNotificationMessage, setIsVisible } = useContext(NotificationContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isSpinnerVisible, setIsSpinnerVisisble] = useState(true);
  const [overview, setOverview] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [isAddSkillClicked, setIsAddSkillClicked] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("userDetail"));

  const getIntroductionProfileDetail = () => {
    setIsSpinnerVisisble(true);
    fetch(`http://localhost:4000/profile/${user.profileName}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "success") {
          const { designation, overview, experience, skills } = res.introduction.profile;
          setDesignation(designation);
          setOverview(overview);
          setExperience(experience);
          setSkills([...skills]);
          setIsAddSkillClicked(false);
          setIsVisible(true);
          setNotificationMessage(res.message);
          setIsDisabled(true);
        }
        setIsSpinnerVisisble(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSpinnerVisisble(false);
      });
  };

  useEffect(() => {
    getIntroductionProfileDetail();
  }, []);

  const addSkills = () => {
    if (!skill) {
      return;
    }

    if (skills.indexOf(skill) !== -1) {
      setSkill("");
      return;
    }
    const newSkills = [...skills, skill];
    setSkills(newSkills);
    setSkill("");
  };

  const removeSkill = (skill) => {
    if (isDisabled) {
      return;
    }
    const idx = skills.indexOf(skill);
    skills.splice(idx, 1);
    setSkills([...skills]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSpinnerVisisble(true);
    const payload = {
      designation,
      experience,
      overview,
      skills,
    };

    if (isEditClicked) {
      fetch(`http://localhost:4000/profile/${user.profileName}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsEditClicked(false);
          setIsVisible(true);
          setNotificationMessage(res.message);
          setIsSpinnerVisisble(false);
          setDesignation("");
          setExperience("");
          setOverview("");
          setSkills([]);
          getIntroductionProfileDetail();
        })
        .catch((err) => {
          setIsVisible(true);
          setNotificationMessage("Something went wrong, please try after sometime");
          setIsSpinnerVisisble(false);
        });
    } else {
      fetch(`http://localhost:4000/profile/${user.profileName}`, {
        method: "POST",
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
          setIsSpinnerVisisble(false);
          setDesignation("");
          setExperience("");
          setOverview("");
          setSkills([]);
          getIntroductionProfileDetail();
        })
        .catch((err) => {
          setIsVisible(true);
          setNotificationMessage("Something went wrong, please try after sometime");
          setIsSpinnerVisisble(false);
        });
    }
  };

  return (
    <div className="introduction">
      {isSpinnerVisible && (
        <div className="permissionSpinner">
          <div className="permissionSpinner_loading">
            <FadeLoader />
          </div>
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="group">
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} disabled={isDisabled} />
          <span className="highlight"></span>
          <span className="bar"></span>
          {!isDisabled && <label className="group_text">Designation</label>}
        </div>

        <div className="group">
          <input
            type="number"
            value={experience}
            disabled={isDisabled}
            onChange={(e) => {
              if (e.target.value < 0) {
                setExperience(0);
              } else {
                setExperience(e.target.value);
              }
            }}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          {!isDisabled && <label className="group_text">Professional Experience</label>}
        </div>

        <div className="group">
          <textarea value={overview} onChange={(e) => setOverview(e.target.value)} disabled={isDisabled} />
          <span className="highlight"></span>
          <span className="bar"></span>
          {!isDisabled && <label className="group_text">Overview</label>}
        </div>

        {!isDisabled && (
          <div
            className="introduction_skill"
            onClick={() => {
              setIsAddSkillClicked(!isAddSkillClicked);
              if (!isAddSkillClicked) {
                setSkill("");
              }
            }}
          >
            {isAddSkillClicked ? (
              <>
                <AiOutlineMinusCircle /> <span>Hide Skill</span>
              </>
            ) : (
              <>
                <AiOutlinePlusCircle /> <span>Add Skills</span>{" "}
              </>
            )}
          </div>
        )}

        {isAddSkillClicked && (
          <div className="group" style={{ width: "70%", display: "inline-block" }}>
            <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="group_text">skills</label>
          </div>
        )}
        {isAddSkillClicked && (
          <span className="introduction_addSkill" onClick={() => addSkills()}>
            <AiOutlineAppstoreAdd />
          </span>
        )}

        {skills.length > 0 && (
          <div className="introduction_skillList">
            {skills.map((skill) => {
              return (
                <div key={skill} className="introduction_skillList-list">
                  {skill}
                  <span className="introduction_skillList-list_cancel" onClick={() => removeSkill(skill)}>
                    <ImCross />
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {designation && experience && overview && skills.length > 0 && (
          <div className="introduction_button">
            {!isDisabled && <Button type="submit" name={isEditClicked ? "Update" : "Add"} />}
            {isDisabled && (
              <Button
                name="Edit"
                clickCallBack={(e) => {
                  e.preventDefault();
                  setIsEditClicked(true);
                  setIsDisabled(false);
                  setNotificationMessage("");
                  setIsVisible(false);
                }}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Introduction;
