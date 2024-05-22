import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { HomeDeck } from "../utils/utils";
import { Link } from "expo-router";
export default function DeckTile(props: { deck: HomeDeck }) {
  const { deck } = props;
  return (
    <View>
      <Link href={`deck/${deck.deckId}`}>
        <Text>{deck.deckName}</Text>
        <FlatList
          data={deck.tags}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
        <Text>{deck.totalCards} Cards</Text>
      </Link>
    </View>
  );
}
