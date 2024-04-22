import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

function FunctionTest(props) {
  const [value, setValue] = useState();

  const change = (x) => {
    return 2 * x;
  };

  return (
    <View style={styles.container}>
      <Text>{value}</Text>
      <Button onPress={() => setValue(change(5))} title="Press" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});

export default FunctionTest;
