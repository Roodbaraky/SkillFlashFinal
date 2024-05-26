import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function TagButton({ text, onPress }) {
  return (
    <Pressable style={styles.tag} onPress={onPress}>
      <Text style={styles.tagText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    padding: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    color: "white",
    width: "auto",
    height: 25,
    justifyContent: "center",
  },
  tagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
});
