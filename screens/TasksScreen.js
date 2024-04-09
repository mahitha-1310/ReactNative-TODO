import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useGlobalState } from "../store/StateContext";
import {
  toggleComplete,
  toggleFavorites,
  deleteTask,
} from "../utils/GlobalFunctions";

function TasksScreen(props) {
  const { tasks, setGlobalTasks } = useGlobalState();
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  //   const [favoriteTasks, setFavoriteTasks] = useState([]);

  const addTask = () => {
    if (taskTitle.trim() === "") return;
    // console.log(Date.now());
    setGlobalTasks([
      {
        id: Date.now(),
        title: taskTitle.trim(),
        deadline: selectedDate,
        completed: false,
        favorites: false,
      },
      ...tasks,
    ]);
    setTaskTitle("");
    setSelectedDate(null);
  };

  //   const deleteTask = (taskId) => {
  //     setGlobalTasks(tasks.filter((task) => task.id !== taskId));
  //   };

  //   const toggleComplete = (taskId) => {
  //     setGlobalTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           return { ...task, completed: !task.completed };
  //         }
  //         return task;
  //       })
  //     );
  //   };

  //   const toggleFavorites = (taskId) => {
  //     setGlobalTasks(
  //       tasks.map((task) => {
  //         if (task.id === taskId) {
  //           return { ...task, favorites: !task.favorites };
  //         }
  //         return task;
  //       })
  //     );
  //   };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
        <TextInput
          style={styles.input}
          placeholder="Task to be done"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <View style={[styles.datecontainer, styles.input]}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={showDatePickerModal}
          >
            <TextInput
              style={styles.inputContainer}
              placeholder="Choose Deadline (Optional)"
              editable={false}
              value={selectedDate ? selectedDate.toDateString() : ""}
            />
            <MaterialIcons name="event" size={24} color="black" />
          </TouchableOpacity>
          {selectedDate && (
            <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* <Button title="Add Task" onPress={addTask} /> */}
        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>ADD TASK</Text>
        </Pressable>

        <View>
          {/* {console.log(tasks)} */}
          {tasks.some((item) => !item.completed) && (
            <Text style={styles.heading}>PENDING TASKS</Text>
          )}
          <FlatList
            style={styles.flatlist}
            data={tasks}
            renderItem={({ item }) =>
              !item.completed && (
                <TaskItem
                  task={item}
                  onDelete={() => deleteTask(item.id, tasks, setGlobalTasks)}
                  onToggleComplete={() =>
                    toggleComplete(item.id, tasks, setGlobalTasks)
                  }
                  onToggleFavorites={() =>
                    toggleFavorites(item.id, tasks, setGlobalTasks)
                  }
                />
              )
            }
            keyExtractor={(item) => item.id.toString()}
          />

          {tasks.some((item) => item.completed) && (
            <Text style={styles.heading}>COMPLETED TASKS</Text>
          )}
          <FlatList
            style={styles.flatlist}
            data={tasks}
            renderItem={({ item }) =>
              item.completed && (
                <TaskItem
                  task={item}
                  onDelete={() => deleteTask(item.id)}
                  onToggleComplete={() =>
                    toggleComplete(item.id, tasks, setGlobalTasks)
                  }
                  onToggleFavorites={() =>
                    toggleFavorites(item.id, tasks, setGlobalTasks)
                  }
                />
              )
            }
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    marginTop: 50,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  datecontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    paddingRight: 10,
    color: "#000",
  },
  clearButton: {
    marginLeft: 10,
  },
  flatlist: {
    marginTop: 20,
  },
  heading: {
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#cd5b45",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default TasksScreen;
