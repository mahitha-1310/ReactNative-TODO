import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const EditTaskModal = ({ visible, task, onSave, onCancel }) => {
  const [editedTaskName, setEditedTaskName] = useState(task.title);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setEditedTaskName(task.title);
    setEditedDeadline(task.deadline);
  }, [visible]);

  const handleSave = () => {
    if (editedTaskName.trim() === "")
      return Alert.alert("Error", "Task title can't be empty.");
    onSave({
      ...task,
      title: editedTaskName,
      deadline: editedDeadline,
    });
  };
  const handleDateChange = (event, editedDeadline) => {
    setShowDatePicker(false);
    if (editedDeadline) {
      setEditedDeadline(editedDeadline);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const clearDate = () => {
    setEditedDeadline(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      {/* <View style={styles.modal}> */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>EDIT TASK</Text>

          <TextInput
            value={editedTaskName}
            style={styles.input}
            onChangeText={setEditedTaskName}
            placeholder="Task Name"
          />
          {/* <TextInput
            value={editedDeadline}
            onChangeText={setEditedDeadline}
            placeholder="Deadline"
          /> */}
          {/* <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onCancel} /> */}
          <View style={[styles.datecontainer, styles.input]}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={showDatePickerModal}
            >
              <TextInput
                style={styles.inputContainer}
                placeholder="Choose Deadline (Optional)"
                onChangeText={setEditedDeadline}
                editable={false}
                value={
                  editedDeadline ? new Date(editedDeadline).toDateString() : ""
                }
              />
              <MaterialIcons name="event" size={24} color="black" />
            </TouchableOpacity>
            {editedDeadline && (
              <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
                <Ionicons name="close" size={20} color="gray" />
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={new Date(editedDeadline) || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>SAVE</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // modal: {
  //   alignItems: "center",
  // },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#cd5b45",
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  heading: {
    marginVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 15,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    marginTop: 30,
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "90%",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
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
    width: "100%",
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
});

export default EditTaskModal;
