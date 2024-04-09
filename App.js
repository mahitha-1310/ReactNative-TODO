// import { StatusBar } from "expo-status-bar";
// import {
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import React, { useState } from "react";
// import TaskItem from "./components/TaskItem";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [taskTitle, setTaskTitle] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const addTask = () => {
//     if (taskTitle.trim() === "") return;
//     // console.log(Date.now());
//     setTasks([
//       { id: Date.now(), title: taskTitle.trim(), deadline: selectedDate },
//       ...tasks,
//     ]);
//     setTaskTitle("");
//     setSelectedDate(null);
//   };

//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter((task) => task.id !== taskId));
//   };

//   const toggleComplete = (taskId) => {
//     setTasks(
//       tasks.map((task) => {
//         if (task.id === taskId) {
//           return { ...task, completed: !task.completed };
//         }
//         return task;
//       })
//     );
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setSelectedDate(selectedDate);
//     }
//   };

//   const showDatePickerModal = () => {
//     setShowDatePicker(true);
//   };

//   const clearDate = () => {
//     setSelectedDate(null);
//   };

//   return (
//     <ImageBackground
//       style={styles.background}
//       source={require("./assets/background.jpg")}
//     >
//       <View style={[styles.container, styles.overlay]}>
//         <TextInput
//           style={styles.input}
//           placeholder="Task to be done"
//           value={taskTitle}
//           onChangeText={setTaskTitle}
//         />

//         <View style={[styles.datecontainer, styles.input]}>
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={showDatePickerModal}
//           >
//             <TextInput
//               style={styles.inputContainer}
//               placeholder="Choose Deadline (Optional)"
//               editable={false}
//               value={selectedDate ? selectedDate.toDateString() : ""}
//             />
//             <MaterialIcons name="event" size={24} color="black" />
//           </TouchableOpacity>
//           {selectedDate && (
//             <TouchableOpacity style={styles.clearButton} onPress={clearDate}>
//               <Ionicons name="close" size={20} color="gray" />
//             </TouchableOpacity>
//           )}
//           {showDatePicker && (
//             <DateTimePicker
//               value={selectedDate || new Date()}
//               mode="date"
//               display="default"
//               onChange={handleDateChange}
//             />
//           )}
//         </View>

//         {/* <Button title="Add Task" onPress={addTask} /> */}
//         <Pressable style={styles.button} onPress={addTask}>
//           <Text style={styles.buttonText}>ADD TASK</Text>
//         </Pressable>

//         <View>
//           {tasks.some((item) => !item.completed) && (
//             <Text style={styles.heading}>PENDING TASKS</Text>
//           )}
//           <FlatList
//             style={styles.flatlist}
//             data={tasks}
//             renderItem={({ item }) =>
//               !item.completed && (
//                 <TaskItem
//                   task={item}
//                   onDelete={() => deleteTask(item.id)}
//                   onToggleComplete={() => toggleComplete(item.id)}
//                 />
//               )
//             }
//             keyExtractor={(item) => item.id.toString()}
//           />
//           {tasks.some((item) => item.completed) && (
//             <Text style={styles.heading}>COMPLETED TASKS</Text>
//           )}
//           <FlatList
//             style={styles.flatlist}
//             data={tasks}
//             renderItem={({ item }) =>
//               item.completed && (
//                 <TaskItem
//                   task={item}
//                   onDelete={() => deleteTask(item.id)}
//                   onToggleComplete={() => toggleComplete(item.id)}
//                 />
//               )
//             }
//             keyExtractor={(item) => item.id.toString()}
//           />
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
//   container: {
//     marginTop: 50,
//   },
//   input: {
//     backgroundColor: "#fff",
//     color: "#000",
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     marginVertical: 5,
//     marginHorizontal: 20,
//     borderWidth: 1,
//     borderColor: "#000",
//   },
//   datecontainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   inputContainer: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",

//     paddingRight: 10,
//     color: "#000",
//   },
//   clearButton: {
//     marginLeft: 10,
//   },
//   flatlist: {
//     marginTop: 20,
//   },
//   heading: {
//     marginTop: 20,
//     backgroundColor: "rgba(0, 0, 0, 0.80)",
//     color: "white",
//     padding: 15,
//     alignSelf: "flex-start",
//     fontWeight: "bold",
//     fontSize: 18,
//     borderRadius: 50,
//   },
//   button: {
//     backgroundColor: "#cd5b45",
//     alignSelf: "center",
//     marginTop: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     padding: 10,
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// });

// export default App;

// import React from "react";
// import TasksScreen from "./screens/TasksScreen";
// import FavoritesScreen from "./screens/FavoritesScreen";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// const Tab = createMaterialBottomTabNavigator();
// function App(props) {
//   // return <TasksScreen />;
//   return (
//     <Tab.Navigator
//       initialRouteName="TasksScreen"
//       activeColor="#e91e63"
//       barStyle={{ backgroundColor: "tomato" }}
//     >
//       <Tab.Screen
//         name="TasksScreen"
//         component={TasksScreen}
//         options={{
//           tabBarLabel: "Tasks",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="home" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="FavoritesScreen"
//         component={FavoritesScreen}
//         options={{
//           tabBarLabel: "Favorites",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="bell" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import TasksScreen from "./screens/TasksScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, StyleSheet } from "react-native";
import { StateProvider } from "./store/StateContext";

const Tab = createMaterialBottomTabNavigator();
function App(props) {
  return (
    <StateProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="TasksScreen"
          activeColor="#cd5b45"
          inactiveColor="#FAEEEC"
          barStyle={{ backgroundColor: "#cd5b45" }}
        >
          <Tab.Screen
            name="TasksScreen"
            component={TasksScreen}
            options={{
              tabBarLabel: <Text style={styles.text}>TASKS</Text>,
              tabBarIcon: ({ color }) => (
                <Icon name="list" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="FavoritesScreen"
            component={FavoritesScreen}
            options={{
              tabBarLabel: <Text style={styles.text}>FAVORITES</Text>,
              tabBarIcon: ({ color }) => (
                <Icon name="star" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#FAEEEC",
  },
});
export default App;
