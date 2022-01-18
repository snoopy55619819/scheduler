import React, { Fragment } from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions";

export default function Button({confirm, danger, clickable, onClick, disabled, children}) {
   let buttonClass = "button";
   if(confirm) {
      buttonClass += " button--confirm";
   } else if(danger) {
      buttonClass += " button--danger";
   }

   return (
      <button onClick={onClick} className={buttonClass} disabled={disabled}>{children}</button>
   );
}