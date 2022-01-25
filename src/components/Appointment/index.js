import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  
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

  function deleteInterview(id) {
    transition(DELETING)

    cancelInterview(id)
      .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={time} />
      { (mode === "EMPTY") && <Empty onAdd={() => transition(CREATE)}/> }
      { (mode === "SHOW") && 
        interview &&
        <Show 
          id={id}
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
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
      { (mode === "DELETING") && <Status message={"Deleting"}/> }
      { (mode === "CONFIRM") && 
        <Confirm message={"Are you sure you would like to delete?"} 
        onCancel={() => back()}
        onConfirm={() => deleteInterview(id)}
        /> }

    </article>
  );
}