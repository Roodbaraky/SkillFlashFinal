import React from "react";
import { View, Text, Pressable } from "react-native";
import { HomeDeck } from "../utils/utils";
import { Link } from "expo-router";
import styles from "@/styling/style";
import { tags, categoryColors } from "@/constants/tags";

export default function DeckTile(props: { deck: HomeDeck }) {
  const { deck } = props;

  function findTagCategory(currentTag: string) {
    const tagObject = tags.find(
      (tag: { tagName: string; tagCategory: string }) =>
        tag.tagName.toLowerCase() === currentTag.toLowerCase()
    );
    return tagObject?.tagCategory.toString() || "default";
  }

  return (
    <View style={[styles.container, styles.addTopMargin]}>
      <Link
        href={`deck/${deck._id}`}
        style={{ flex: 1, textDecorationLine: "none" }}
      >
        <View style={styles.deckTileContainer}>
          <Text style={styles.deckName}>{deck.deckName}</Text>
          <View style={styles.tagsContainer}>
            {deck.tags.map((tag, index) => {
              const tagCategory = findTagCategory(tag);
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.tagButton,
                    { backgroundColor: categoryColors[tagCategory] },
                  ]}
                >
                  <Text style={[styles.tagButtonText, styles.fontSize12]}>
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.cardCount}>{deck.cards.length} cards</Text>
        </View>
      </Link>
    </View>
  );
}
