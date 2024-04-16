import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import SearchScreenModal from "../modals/SearchScreenModal";

const Header = () => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const handleSearchPress = () => {
    setSearchModalVisible(true);
  };

  const cancelSearchModal = () => {
    setSearchModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}></Text>
      <View style={styles.search}>
        <TouchableOpacity onPress={handleSearchPress}>
          <MaterialIcons name="search" size={32} color="white" />
        </TouchableOpacity>
      </View>
      {searchModalVisible && (
        <SearchScreenModal
          visible={searchModalVisible}
          onCancel={cancelSearchModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    paddingTop: 36,
    backgroundColor: "#cd5b45",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    alignSelf: "flex-start",
  },
  search: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 4,
    right: 5,
  },
});

export default Header;
