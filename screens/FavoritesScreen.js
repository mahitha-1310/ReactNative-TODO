import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useGlobalState } from "../store/StateContext";
import TaskItem from "../components/TaskItem";
import {
  toggleComplete,
  toggleFavorites,
  deleteTask,
} from "../utils/GlobalFunctions";

function FavoritesScreen(props) {
  const { tasks, setGlobalTasks } = useGlobalState();
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
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
  },
  heading: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 60,
    backgroundColor: "#cd5b45",
    color: "white",
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    // fontSize: 18,
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
