// import { Alert } from "react-native";

// export const toggleComplete = (taskId, tasks, setGlobalTasks) => {
//   setGlobalTasks(
//     tasks.map((task) => {
//       if (task.id === taskId) {
//         return { ...task, completed: !task.completed };
//       }
//       return task;
//     })
//   );
// };

// export const toggleFavorites = (taskId, tasks, setGlobalTasks) => {
//   setGlobalTasks(
//     tasks.map((task) => {
//       if (task.id === taskId) {
//         return { ...task, favorites: !task.favorites };
//       }
//       return task;
//     })
//   );
// };

// export const deleteTask = (taskId, dispatch) => {
//   Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
//     { text: "Cancel", style: "cancel" },
//     {
//       text: "Delete",
//       onPress: () => dispatch({ type: "DELETE_TASK", payload: taskId }),
//     },
//   ]);
// };
