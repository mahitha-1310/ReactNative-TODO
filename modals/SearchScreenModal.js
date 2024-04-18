import React, { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";

import TaskItem from "../components/TaskItem";
import EditTaskModal from "./EditTaskModal";
import { useTask } from "../store/StateContext";

function SearchScreenModal({ visible, onCancel }) {
  const [searchText, setSearchText] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, deleteTask, editTask, toggleFavorite, toggleComplete } =
    useTask();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (taskId) => {
    deleteTask(taskId, dispatch);
  };

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
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onCancel}
    >
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
      >
        <ScrollView
          style={[styles.container, styles.overlay]}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Pressable style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>GO BACK</Text>
          </Pressable>
          <TextInput
            style={styles.searchText}
            placeholderTextColor="#d4d5d6"
            placeholder="Search tasks..."
            value={searchText}
            onChangeText={setSearchText}
          />
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
                <Text style={styles.emptyList}>No tasks found</Text>
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
        </ScrollView>
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 20,
  },
  text: {
    color: "yellow",
  },
  button: {
    backgroundColor: "#cd5b45",
    margin: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
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
  searchText: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    margin: 20,
    borderRadius: 5,
    color: "#fff",
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

export default SearchScreenModal;
