import React, { useState } from "react";
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
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
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>GO BACK</Text>
        </Pressable>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
          }}
          placeholder="Search tasks..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {/* <FlatList
            data={filteredTasks}
            renderItem={({ item }) => <TaskItem task={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>No tasks found</Text>}
          /> */}
        {/* <FlatList
            data={filteredTasks}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onDelete={() => handleDelete(item.id)}
                onToggleComplete={() =>
                  dispatch({ type: "TOGGLE_COMPLETE", payload: item.id })
                }
                onToggleFavorites={() =>
                  dispatch({ type: "TOGGLE_FAVORITES", payload: item.id })
                }
                onEdit={() => openEditModal(item)}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text>No tasks found</Text>}


          /> */}

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
          ListEmptyComponent={<Text>No tasks found</Text>}
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  //   centeredView: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  //   modalView: {
  //     backgroundColor: "#fff",
  //     padding: 20,
  //     alignItems: "center",
  //     height: "100%",
  //     width: "100%",
  //   },
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
});

export default SearchScreenModal;
