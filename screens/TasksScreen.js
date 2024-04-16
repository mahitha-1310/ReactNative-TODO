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
import { useTask } from "../store/StateContext";

import {
  toggleComplete,
  toggleFavorites,
  deleteTask,
} from "../utils/GlobalFunctions";
import EditTaskModal from "../modals/EditTaskModal";
import AddItem from "../components/AddTask";

function TasksScreen(props) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  // const { state, dispatch } = useGlobalState();
  const { tasks, deleteTask, editTask, toggleFavorite, toggleComplete } =
    useTask();
  const handleDelete = (taskId) => {
    deleteTask(taskId, dispatch);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    // console.log(selectedTask);
    setEditModalVisible(true);
  };

  const saveEditedTask = (editedTask) => {
    // dispatch({ type: "EDIT_TASK", payload: editedTask });
    editTask(editedTask.id, editedTask);
    setEditModalVisible(false);
  };

  const cancelEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
        <View>
          {/* {console.log(tasks)} */}
          {tasks.some((item) => !item.completed) && (
            <Text style={styles.heading}>PENDING TASKS</Text>
          )}
          <FlatList
            data={tasks}
            renderItem={({ item }) =>
              !item.completed && (
                <TaskItem
                  task={item}
                  onDelete={() => deleteTask(item.id)}
                  onToggleComplete={() => toggleComplete(item.id)}
                  onToggleFavorites={() => toggleFavorite(item.id)}
                  onEdit={() => openEditModal(item)}
                />
              )
            }
            keyExtractor={(item) => item.id.toString()}
          />

          {tasks.some((item) => item.completed) && (
            <Text style={styles.heading}>COMPLETED TASKS</Text>
          )}
          <FlatList
            data={tasks}
            renderItem={({ item }) =>
              item.completed && (
                <TaskItem
                  task={item}
                  onDelete={() => deleteTask(item.id)}
                  onToggleComplete={() => toggleComplete(item.id)}
                  onToggleFavorites={() => toggleFavorite(item.id)}
                  onEdit={() => openEditModal(item)}
                />
              )
            }
            keyExtractor={(item) => item.id.toString()}
          />

          {selectedTask && (
            <EditTaskModal
              visible={editModalVisible}
              task={selectedTask}
              onSave={saveEditedTask}
              onCancel={cancelEditModal}
            />
          )}
          {/* <AddItem /> */}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {},
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

  heading: {
    marginTop: 50,
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
