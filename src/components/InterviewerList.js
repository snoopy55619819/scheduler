import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList({ interviewers, value, onChange }) {
  const parsedInterviewers = interviewers.map(currInterviewer => {
    return <InterviewerListItem
      key={currInterviewer.id}
      name={currInterviewer.name}
      avatar={currInterviewer.avatar}
      selected={currInterviewer.id === value}
      setInterviewer={() => onChange(currInterviewer.id)}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewers }
      </ul>
    </section>
  );
}