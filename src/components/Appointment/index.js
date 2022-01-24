import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment({ id, time, interview, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  let { mode, transition, back } = useVisualMode((interview ? SHOW : EMPTY));

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { (mode === "EMPTY") && <Empty onAdd={() => transition(CREATE)}/> }
      { (mode === "SHOW") && 
        <Show 
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      }
      {/* props: { student, interviewer, interviewers, onSave, onCancel } */}
      { (mode === "CREATE") && 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      }
      
    </article>
  );
}