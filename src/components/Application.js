import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {

  // Merge all states into one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // Create seperate functions for each state setter to mimic having seperate useState for each.
  const setDay = day => setState(prev => ({...prev, day }));

  // API requests to change state of days, appointments and interviews on page load:
  //  '/api/days'         --> setState.days         ->  [ { id, name, appointments, interviewers, spots } ]
  //  '/api/appointments' --> setState.appointments ->  { { id, time, interview:{ interviewer, student } } }
  //  '/api/interviewers' --> setState.interviewers ->  { { id, name, avatar } }
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(results => {
        const daysData = results[0].data;
        const appointmentsData = results[1].data;
        const interviewersData = results[2].data;
        
        setState(prev => ({...prev, days: daysData, appointments: appointmentsData, interviewers: interviewersData}))
      })
      .catch(err => console.log(err));
  }, [])

  
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
