import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AddTaskModal from "../modals/AddTaskModal";
import { useTask } from "../store/StateContext";

function AddTask() {
  // const { dispatch } = useGlobalState();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { addTask } = useTask();

  const openAddModal = () => {
    //console.log(addModalVisible);
    setAddModalVisible(true);
  };

  const saveAddedTask = (addedTask) => {
    addTask(addedTask);
    setAddModalVisible(false);
  };

  const cancelAddModal = () => {
    setAddModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={openAddModal}>
        <Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
      {addModalVisible && (
        <AddTaskModal
          visible={addModalVisible}
          onSave={saveAddedTask}
          onCancel={cancelAddModal}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 100,
    right: 5,
    alignSelf: "flex-end",
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: "#cd5b45",
    borderWidth: 3,
  },
});

export default AddTask;
