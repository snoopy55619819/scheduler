import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem({ name, avatar, selected, setInterviewer }) {
  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": selected
  })

  const interviewerImgClass = classNames({
    "interviewers__item-image": true,
    "interviewers__item--selected-image": selected
  })
  
  return (
    <li onClick={setInterviewer}
      className={interviewerClass}>
      <img
        className={interviewerImgClass}
        src={avatar}
        alt={name}
      />
      {selected && name }
    </li>
  );
}