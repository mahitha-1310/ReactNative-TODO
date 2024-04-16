import React, { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useGlobalState } from "../store/StateContext";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

function AddTaskModal({ visible, onSave, onCancel }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const addTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = {
      id: String(Date.now()),
      title: taskTitle.trim(),
      deadline: selectedDate,
      completed: false,
      favorites: isEnabled,
    };
    setTaskTitle("");
    setSelectedDate(null);
    onSave(newTask);
  };

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.heading}>ADD TASK</Text>

          <TextInput
            style={styles.input}
            placeholder="Task to be done"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          <View style={[styles.container, styles.input]}>
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

          <View style={[styles.container]}>
            <Text>Add to Favorites</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#000" }}
              thumbColor={isEnabled ? "#cd5b45" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={addTask}>
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
}

const styles = StyleSheet.create({
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
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default AddTaskModal;
