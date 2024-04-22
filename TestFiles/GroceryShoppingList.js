import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, Button, StyleSheet, Text } from "react-native";

function GroceryShoppingList() {
  const [groceryItem, setGroceryItem] = useState("");
  const [items, setItems] = useState([]);

  const addNewItemToShoppingList = () => {
    setItems([groceryItem, ...items]);
    setGroceryItem("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={groceryItem}
        placeholder="Enter grocery item"
        onChangeText={(text) => setGroceryItem(text)}
      />
      <Button title="Add the item to list" onPress={addNewItemToShoppingList} />
      {items.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
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

export default GroceryShoppingList;
