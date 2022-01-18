import React, { Fragment } from "react";

import "components/Button.scss";

export default function Button({confirm, danger, disabled, children}) {
   let buttonClass = "button";
   if(confirm) {
      buttonClass += " button--confirm";
   } else if(danger) {
      buttonClass += " button--danger";
   }
   return (
      <button className={buttonClass}>{children}</button>
   );
}