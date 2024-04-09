export const toggleComplete = (taskId, tasks, setGlobalTasks) => {
  setGlobalTasks(
    tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    })
  );
};

export const toggleFavorites = (taskId, tasks, setGlobalTasks) => {
  setGlobalTasks(
    tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, favorites: !task.favorites };
      }
      return task;
    })
  );
};

export const deleteTask = (taskId, tasks, setGlobalTasks) => {
  setGlobalTasks(tasks.filter((task) => task.id !== taskId));
};
