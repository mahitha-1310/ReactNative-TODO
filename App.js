import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, StyleSheet, View } from "react-native";
import { StateProvider } from "./store/StateContext";
import AddItem from "./components/AddTask";
import Header from "./components/Header";
import TasksScreen from "./screens/TasksScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
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
  );
};

const HomeScreen = ({ navigation }) => {
  console.log("home", navigation);
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <TabNavigator />
      <AddItem />
    </View>
  );
};

const App = () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#FAEEEC",
  },
});

export default App;
