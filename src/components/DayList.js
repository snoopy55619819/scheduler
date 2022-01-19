import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {
  const listOfDaysData = days.map(currDay => {
    return {
      id: currDay.id,
      name: currDay.name,
      spots: currDay.spots,
      selected: currDay.name === day,
      setDay
    }
  });
  const parsedDaysData = listOfDaysData.map(day => <DayListItem key={day.id} {...day}/>)

  return(
    <ul>
      { parsedDaysData }
    </ul>
  );
}