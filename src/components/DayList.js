import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {
  const listOfDaysData = days.map(currDay => {
    return <DayListItem
      key={currDay.id}
      name={currDay.name}
      spots={currDay.spots}
      selected={currDay.name === value}
      setDay={() => onChange(currDay.name)}
    />
  });

  return(
    <ul>
      { listOfDaysData }
    </ul>
  );
}