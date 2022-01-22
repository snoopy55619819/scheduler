// import { action } from "@storybook/addon-actions";
import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setHistory(prev => {
      if(replace){
        const newHistory = prev.slice(0, -1);
        newHistory.push(newMode);
        return newHistory;
      }
      prev.push(newMode)
      return prev;
    });
    return setMode(newMode);
  }

  const back = () => {
    if(history.length === 1) {
      return;
    }
    setHistory(prev => {
      const newHistory = prev.slice(0, -1);
      
      setMode(newHistory.slice(-1)[0]);
      return newHistory;
    });
  }

  return {
    mode,
    transition,
    back
  }
}