import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useGlobalState } from "../store/StateContext";
import TaskItem from "../components/TaskItem";
// import { deleteTask } from "../utils/GlobalFunctions";
import EditTaskModal from "../modals/EditTaskModal";
import { useTask } from "../store/StateContext";

function FavoritesScreen(props) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, deleteTask, editTask, toggleFavorite, toggleComplete } =
    useTask();

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const saveEditedTask = (editedTask) => {
    editTask(editedTask.id, editedTask);
    setEditModalVisible(false);
  };

  const cancelEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/favorites.jpg")}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>FAVORITE TASKS</Text>
        <FlatList
          style={styles.flatlist}
          data={tasks}
          renderItem={({ item }) =>
            item.favorites && (
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
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
  heading: {
    marginTop: 60,
    backgroundColor: "#cd5b45",
    color: "white",
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    borderRadius: 10,
    alignSelf: "center",
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default FavoritesScreen;
