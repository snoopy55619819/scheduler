import React from "react";
import DayListItem from "./DayListItem";

export default function DayList({ days, value, onChange }) {
  const listOfDaysData = days.map(({ id, name, spots }) => 
    <DayListItem
      key={id}
      name2
      name={name}
      spots={spots}
      selected={name === value}
      setDay={() => onChange(name)}
    />
  );

  return(
    <ul>
      { listOfDaysData }
    </ul>
  );
}