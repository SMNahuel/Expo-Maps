import React, { useState } from "react";
import { View, Text, StyleSheet,  } from "react-native";
import { router } from "expo-router";
import {
  GestureHandlerRootView,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { MenuIcon } from "./Icon";

const Footer = ({dest, text} : any) => {
  const toggleModal = () => {
    router.replace(dest);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 ,height: '5%'}}>
      <View style={styles.container}>
        <Text style={{ color: "white" }}>{text}</Text>
        <TouchableHighlight onPress={toggleModal}>
          <MenuIcon />
        </TouchableHighlight>
      </View>
      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex :1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#676767",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#cccccc",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowContainerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  rowContainerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "30%",
  },
  modal: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Footer;
