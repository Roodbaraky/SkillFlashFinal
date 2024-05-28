import { Card } from "@/utils/utils";
import { SafeAreaView, Text, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import Badge from "./Badge";
import { tags, categoryColors } from "@/constants/tags";
import styles from "@/styling/style";
export default function CardTile(props: { card: Card }) {
  const { card } = props;
  const tag = tags.find(
    (tag) => tag.tagName.toLowerCase() === card.tag.toLowerCase()
  );
  const backgroundColor =
    (tag?.tagCategory && categoryColors[tag.tagCategory]) ||
    categoryColors["default"];

  return (
    <SafeAreaView
      style={[styles.cardTileContainer, { borderColor: backgroundColor }]}
    >
      <Pressable
        style={[
          styles.tagButton,
          styles.cardTileTag,
          { backgroundColor: backgroundColor },
        ]}
      >
        <Text style={[styles.tagButtonText, styles.fontSize12]}>
          {card.tag}
        </Text>
      </Pressable>
      <Text style={styles.cardTileQ}>Q: {card.Q}</Text>
      <Text style={styles.stats}>
        Answered correctly: {card.Y}/{card.Y + card.N}
      </Text>
    </SafeAreaView>
  );
}
