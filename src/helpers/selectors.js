export function getAppointmentsForDay(state, day) {
  if(state.days.length === 0) {
    return [];
  }

  const filteredDay = state.days.filter(currDay => currDay.name === day)[0];
  if(!filteredDay) {
    return [];
  }

  const appointmentsForDay = filteredDay.appointments.map(id => state.appointments[id]);
 
  return appointmentsForDay;
}


export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId];

  const newInterview = {
    student: interview.student,
    interviewer: interviewerObj
  };
  return newInterview;
}


export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  if(days.length === 0) {
    return [];
  }
  const filteredDay = days.filter(currDay => currDay.name === day)[0];
  if(!filteredDay) {
    return [];
  }

  const interviewersForDay = filteredDay.interviewers.map(interviewerId => interviewers[interviewerId]);
  return interviewersForDay;
}