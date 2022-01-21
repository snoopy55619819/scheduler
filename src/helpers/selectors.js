export function getAppointmentsForDay(state, day) {
  if(state.days.length === 0) {
    return [];
  }
  const filteredDay = state.days.filter(currDay => currDay.name === day)[0];
  if(!filteredDay) {
    return [];
  }
  const appointmentsForDay = filteredDay.appointments.map(id => {
    if(state.appointments[id]) {
      return state.appointments[id];
    }
    return [];
  })
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const newInterview = {...interview};
  const currInterviewerInfo = {...state.interviewers[newInterview.interviewer]}
  newInterview.interviewer = currInterviewerInfo;
  return newInterview;
}
