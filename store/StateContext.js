import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";

const StateContext = createContext();

const initialState = {
  username: "",
  tasks: [],
  fullName: "",
};

const BASE_URL = "http://10.0.2.2:3000";

const stateReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // console.log("FullName:", action.payload.fullName);
      return {
        ...state,
        tasks: action.payload.tasks,
        username: action.payload.id,
        fullName: action.payload.fullName,
      };
    case "FETCH_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "ADD_TASK":
      // console.log(state);
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
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
    case "LOG_OUT":
      return {
        ...state,
        username: "",
        tasks: [],
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addTask = async (newTask) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;

      const updatedTasks = [newTask, ...user.tasks];
      const updatedUser = { ...user, tasks: updatedTasks };
      axios
        .put(`${BASE_URL}/users/${user.id}`, updatedUser)
        .then((response) => {
          dispatch({ type: "ADD_TASK", payload: newTask });
        })
        .catch((error) => {
          console.error("Error adding new task:", error);
        });
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const taskIndex = user.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        user.tasks[taskIndex] = updatedTask;
        await axios.put(`${BASE_URL}/users/${user.id}`, user);
        dispatch({ type: "EDIT_TASK", payload: { id: taskId, updatedTask } });
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error editing task:", error.message);
    }
  };

  const deleteTask = (taskId) => {
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
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const updatedTasks = user.tasks.filter((task) => task.id !== taskId);
      user.tasks = updatedTasks;
      await axios.put(`${BASE_URL}/users/${user.id}`, user);
      dispatch({ type: "DELETE_TASK", payload: taskId });
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const task = user.tasks.find((task) => task.id === taskId);

      if (task) {
        task.completed = !task.completed;
        await axios.put(`${BASE_URL}/users/${user.id}`, user);
        console.log(task);
        dispatch({
          type: "EDIT_TASK",
          payload: { id: taskId, updatedTask: task },
        });
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error toggling task completion status:", error.message);
    }
  };

  const toggleFavorit = async (taskId) => {
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

  const toggleFavorite = async (taskId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${state.username}`);
      const user = response.data;
      const task = user.tasks.find((task) => task.id === taskId);

      if (task) {
        task.favorites = !task.favorites;
        await axios.put(`${BASE_URL}/users/${user.id}`, user);
        console.log(task);
        dispatch({
          type: "EDIT_TASK",
          payload: { id: taskId, updatedTask: task },
        });
        // console.log("Task favorite status toggled successfully");
      } else {
        console.error("Task not found");
      }
    } catch (error) {
      console.error("Error toggling task completion status:", error.message);
    }
  };

  const onRegister = async (id, password, fullName, navigation) => {
    try {
      const check = await fetch(`${BASE_URL}/users?id=${id}`);
      const checkData = await check.json();
      const passwordPattern =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (checkData.length != 0) {
        Alert.alert("Error", "Username already exists.");
      } else if (!passwordPattern.test(password)) {
        Alert.alert(
          "Error",
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
        );
      } else {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password, fullName, tasks: [] }),
        });
        const data = await response.json();
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onLogin = async (id, password, navigation, loginSuccess) => {
    // console.log("login", navigation);
    try {
      const response = await fetch(
        `${BASE_URL}/users?id=${id}&password=${password}`
      );
      const data = await response.json();
      if (data.length === 0) {
        Alert.alert("Error", "Enter correct credentials");
      } else {
        const user = data[0];

        dispatch({
          type: "LOGIN",
          payload: { id, tasks: user.tasks, fullName: user.fullName },
        });
        navigation.navigate("Home");
        loginSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = (navigation) => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          navigation.navigate("Login");
          dispatch({ type: "LOG_OUT" });
        },
      },
    ]);
  };

  return (
    <StateContext.Provider
      value={{
        tasks: state.tasks,
        username: state.username,
        fullName: state.fullName,
        addTask,
        editTask,
        deleteTask,
        toggleComplete,
        toggleFavorite,
        onRegister,
        onLogin,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useTask = () => useContext(StateContext);
