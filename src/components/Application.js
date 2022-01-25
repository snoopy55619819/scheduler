import React from "react";

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // parse appointments to make array of appointment components with required props
  const interviewers = getInterviewersForDay(state, state.day);
  const displayAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = displayAppointments.map(currAppointment => {
    const interview = getInterview(state, currAppointment.interview);

    return <Appointment 
      key={currAppointment.id}
      id={currAppointment.id}
      time={currAppointment.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
