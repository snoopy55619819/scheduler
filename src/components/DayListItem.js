import React, {useState} from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem({name, spots, selected, setDay}) {
  const dayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": (spots === 0),
  })

  const formatSpots = () => {
    return `${spots ? spots : 'no'} spot${spots === 1 ? "" : "s"} remaining`;
  }

  const handleClick = () => {
    return setDay(name)
  }

  return(
    <li onClick={handleClick}
      className={dayListItemClass}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text-light">
        {formatSpots()}
        </h3>
    </li>
  );
}