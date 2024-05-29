import React from "react";
import { View, Text, Pressable } from "react-native";
import { HomeDeck } from "../utils/utils";
import { Link } from "expo-router";
import styles from "@/styling/style";
import { tags, categoryColors } from "@/constants/tags";

export default function DeckTile(props: { deck: HomeDeck }) {
  const { deck } = props;
  const orderedTagsShortFirst = deck.tags.sort((a, b) => a.length - b.length);

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
          <Text numberOfLines={1} style={styles.deckName}>
            {deck.deckName}
          </Text>
          <View style={styles.tagsContainer}>
            {orderedTagsShortFirst.map((tag, index) => {
              const tagCategory = findTagCategory(tag);
              return (
                <View
                  key={index}
                  style={[
                    styles.tagButton,
                    { backgroundColor: categoryColors[tagCategory] },
                  ]}
                >
                  <Text style={[styles.tagButtonText, styles.fontSize12]}>
                    {tag}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.cardCount}>{deck.cards.length} cards</Text>
        </View>
      </Link>
    </View>
  );
}
