import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment({ id, time, interview, interviewers, bookInterview, cancelInterview }) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  
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
      .catch(error => transition(ERROR_SAVE, true))
  }

  function deleteInterview(id) {
    transition(DELETING, true)

    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
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
          onEdit={() => transition(CREATE)}
        />
      }
      { (mode === "CREATE") && 
        <Form 
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          student={interview ? interview.student : null}
          interviewer={interview ? interview.interviewer.id : null}
        />
      }
      { (mode === "SAVING") && <Status message={"Saving"}/> }
      { (mode === "DELETING") && <Status message={"Deleting"}/> }
      { (mode === "CONFIRM") && 
        <Confirm message={"Are you sure you would like to delete?"} 
        onCancel={() => back()}
        onConfirm={() => deleteInterview(id)}
        /> }

      { (mode === "ERROR_SAVE" && 
        <Error
          message={"Error could not save appointment."} 
          onClose={() => back()}
        />)}
      { (mode === "ERROR_DELETE" && 
        <Error 
          message={"Error could not delete appointment."}
          onClose={() => back()}
        />)}

    </article>
  );
}