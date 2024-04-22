import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

function SnapshotTest(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hiiiiiiiii</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

export default SnapshotTest;
