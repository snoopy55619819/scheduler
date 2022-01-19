import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, day, setDay }) {
  const listOfDaysData = days.map(currDay => {
    return <DayListItem
      key={currDay.id}
      name={currDay.name}
      spots={currDay.spots}
      selected={currDay.name === day}
      setDay={() => setDay(currDay.name)}
    />
  });

  return(
    <ul>
      { listOfDaysData }
    </ul>
  );
}