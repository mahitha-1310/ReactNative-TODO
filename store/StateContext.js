// StateContext.js
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const setGlobalTasks = (newTask) => {
    setTasks(newTask);
  };

  return (
    <StateContext.Provider value={{ tasks, setGlobalTasks }}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);
