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
import { ScrollView } from "react-native-virtualized-view";

function FavoritesScreen(props) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, deleteTask, editTask, toggleFavorite, toggleComplete } =
    useTask();

  const filteredTasks = tasks.filter((task) => task.favorites == true);
  console.log(filteredTasks);

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
      source={require("../assets/background.jpg")}
    >
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.overlay}> */}
      <ScrollView
        style={[styles.container, styles.overlay]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.heading}>FAVORITE TASKS</Text>
        <FlatList
          style={styles.flatlist}
          data={filteredTasks}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => deleteTask(item.id)}
              onToggleComplete={() => toggleComplete(item.id)}
              onToggleFavorites={() => toggleFavorite(item.id)}
              onEdit={() => openEditModal(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyList}>No favorite tasks found</Text>
            </View>
          }
        />
        {selectedTask && (
          <EditTaskModal
            visible={editModalVisible}
            task={selectedTask}
            onSave={saveEditedTask}
            onCancel={cancelEditModal}
          />
        )}
        {/* </View> */}
      </ScrollView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "grey",
  },
  emptyList: {
    fontSize: 16,
    color: "black",
  },
});

export default FavoritesScreen;
