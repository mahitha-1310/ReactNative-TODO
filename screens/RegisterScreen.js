import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { useTask } from "../store/StateContext";
const RegisterScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const { onRegister } = useTask();
  const handleRegister = () => {
    if (!id.trim() || !password.trim() || !fullName.trim()) {
      Alert.alert("Error", "Please enter all details");
      return;
    }
    if (fullName.trim().length > 10) {
      Alert.alert("Error", "Name can contain only 15 character");
      return;
    }
    onRegister(id.trim(), password.trim(), fullName.trim(), navigation);
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={[styles.container, styles.overlay]}>
        <Text style={styles.heading}>REGISTER HERE</Text>
        <TextInput
          placeholder="Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={id}
          onChangeText={setId}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Pressable
          title="Register"
          onPress={handleRegister}
          style={styles.button}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </Pressable>
        <Pressable
          title="Already have an account? Login"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  heading: {
    marginTop: 50,
    backgroundColor: "rgba(0, 0, 0, 0.80)",
    color: "white",
    padding: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    borderRadius: 50,
  },
  button: {
    marginTop: 60,
    backgroundColor: "#cd5b45",
    color: "white",
    padding: 15,
    alignSelf: "flex-start",
    fontWeight: "bold",
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#cd5b45",
    padding: 15,
    borderRadius: 10,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
