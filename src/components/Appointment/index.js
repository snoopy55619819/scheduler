import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment({ id, time, interview, interviewers, bookInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  
  let { mode, transition, back } = useVisualMode((interview ? SHOW : EMPTY));

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    // show loading section while interview add request is being made.
    transition(SAVING)

    bookInterview(id, interview)
      .then(() => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { (mode === "EMPTY") && <Empty onAdd={() => transition(CREATE)}/> }
      { (mode === "SHOW") && 
        interview &&
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
      { (mode === "SAVING") && <Status message={"Saving"}/> }
      
    </article>
  );
}