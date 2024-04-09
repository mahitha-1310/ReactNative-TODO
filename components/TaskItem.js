import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome";

const TaskItem = ({ task, onDelete, onToggleComplete, onToggleFavorites }) => {
  // const [tasks, setTasks] = useState([]);
  let deadLine = task.deadline ? task.deadline.toDateString() : "";
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggleComplete} style={styles.icon}>
        {/* {console.log(task.completed)} */}
        <Icon
          name="check-circle-o"
          size={20}
          color={task.completed ? "green" : "black"}
        />
      </TouchableOpacity>
      <Text style={[styles.title, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <Text style={styles.deadline}>{deadLine}</Text>

      <TouchableOpacity onPress={onToggleFavorites} style={styles.icon}>
        <Icon
          name="star"
          size={20}
          color={task.favorites ? "orange" : "black"}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Icon name="trash" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    margin: 20,
  },
  title: {
    flex: 1.5,
    fontSize: 14,
  },
  deadline: {
    fontSize: 14,
    color: "gray",
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  icon: {
    paddingRight: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default TaskItem;
