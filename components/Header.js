import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import SearchScreenModal from "../modals/SearchScreenModal";
import { useTask } from "../store/StateContext";

const Header = ({ navigation }) => {
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const { fullName, logout } = useTask();

  const handleSearchPress = () => {
    setSearchModalVisible(true);
  };

  const cancelSearchModal = () => {
    setSearchModalVisible(false);
  };

  const handleLogout = () => {
    logout(navigation);
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hi {fullName},</Text>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleSearchPress}>
          <MaterialIcons name="search" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="exit-to-app" size={32} color="white" />
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
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-around",
    bottom: 10,
    right: 15,
    width: "25%",
  },
  titleContainer: {
    alignSelf: "flex-start",
    justifyContent: "center",
    top: 20,
    left: 20,
  },
});

export default Header;
