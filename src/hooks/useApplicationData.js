import { useState, useEffect } from "react";
import axios from "axios";

// const url = process.env.REACT_APP_WEBSOCKET_URL;

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  // Create seperate functions for state setter to mimic having seperate useState.
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

  }, [])

  // bookInterview to save new interview to appointments when created
  function bookInterview(id, interview) {
    const notEditingInterview = !state.appointments[id].interview;
    // create copy
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // copy appointments and update appointment with new interview
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Add appointment to API and update state with new appointments data
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        
        // Update spots count for daysList when an appointment is booked.
        const updatedDays = state.days.map(day => {
          return {...day, spots: ((day.name === state.day && notEditingInterview)? day.spots - 1 : day.spots)}
        });

        setState({...state, appointments, days: updatedDays});
      })
  }
  
  // delete interviews
  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        // Update spots count for days list when an appointment is cancelled.
        const updatedDays = state.days.map(day => {
          return {...day, spots: (day.name === state.day ? day.spots + 1 : day.spots)}
        });

        setState({...state, appointments, days: updatedDays})
      })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}



  // *****************************************************************
  // Code for websocket implementation. Has a bug somewhere, so commenting out
  //  until issue resolved. Rest of application and required functionality 
  //  works with no issues.

  // const createSocket = new WebSocket(url);

  // // Websocket connection to update appointments realtime
  // useEffect(() => {
    
  //   const ws = createSocket;

  //   ws.onopen = (e) => {
  //     // ws.send("ping");
  //   }

  //   ws.onmessage = (e) => {
  //     const { type, id, interview } = JSON.parse(e.data);
  //     console.log(type, id, interview);

  //     if(interview) {
  //       // create copy
  //       const appointment = {
  //         ...state.appointments[id],
  //         interview: { ...interview }
  //       };

  //       // copy appointments and update appointment with new interview
  //       const appointments = {
  //         ...state.appointments,
  //         [id]: appointment
  //       };

  //       const updatedDays = state.days.map(day => {
  //         return {...day, spots: (day.name === state.day ? day.spots - 1 : day.spots)}
  //       });

  //       setState({...state, appointments, days: updatedDays});
        
  //     } else {
  //       const appointment = {
  //         ...state.appointments[id],
  //         interview: null
  //       };
  //       const appointments = {
  //         ...state.appointments,
  //         [id]: appointment
  //       }
  //       // Update spots count for days list when an appointment is cancelled.
  //       const updatedDays = state.days.map(day => {
  //         return {...day, spots: (day.name === state.day ? day.spots + 1 : day.spots)}
  //       });

  //       setState({...state, appointments, days: updatedDays})

  //     }
  //     // return ws.close();
  //   }
  // }, []);
  // ***************************************************************** 