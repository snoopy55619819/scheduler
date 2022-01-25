import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList({ interviewers, value, onChange }) {
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

// Use propTypes library for testing prop input types. Browser console outputs
//  an error warning message of type mismatch from expected.
//  TypeScript or Flow is an alternative and more widely used.
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;