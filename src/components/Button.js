import React from "react";

import "components/Button.scss";
// import { action } from "@storybook/addon-actions";
import classNames from "classnames";

export default function Button({confirm, danger, onClick, disabled, children}) {
   const buttonClass = classNames({
      "button": true,
      "button--confirm": confirm,
      "button--danger": danger
   });
   
   return (
      <button 
         onClick={onClick} 
         className={buttonClass} 
         disabled={disabled}
      >
         {children}
      </button>
   );
}