import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";

const StateContext = createContext();

const initialState = {
  tasks: [],
};

const BASE_URL = "http://10.0.2.2:3000";

const stateReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload.updatedTask : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tasks`);
        dispatch({ type: "FETCH_TASKS", payload: response.data });
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, task);
      dispatch({ type: "ADD_TASK", payload: response.data });

      // const fetchResponse = await axios.get(`${BASE_URL}/tasks`);
      // dispatch({ type: "FETCH_TASKS", payload: fetchResponse.data });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask);
      dispatch({ type: "EDIT_TASK", payload: { id: taskId, updatedTask } });
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  const deleteTask = (taskId) => {
    // console.log(state);
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => confirmDeleteTask(taskId),
      },
    ]);
  };

  const confirmDeleteTask = async (taskId) => {
    try {
      // console.log(taskId);
      await axios.delete(`${BASE_URL}/tasks/${taskId}`);
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Task not found:", error.message);
      } else {
        console.error("Error deleting task:", error.message);
      }
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };
      await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask);
      dispatch({ type: "EDIT_TASK", payload: { id: taskId, updatedTask } });
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  const toggleFavorite = async (taskId) => {
    try {
      const taskToUpdate = state.tasks.find((task) => task.id === taskId);
      const updatedTask = {
        ...taskToUpdate,
        favorites: !taskToUpdate.favorites,
      };
      await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask);
      dispatch({ type: "EDIT_TASK", payload: { id: taskId, updatedTask } });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        editTask,
        deleteTask,
        toggleComplete,
        toggleFavorite,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTask = () => useContext(StateContext);
