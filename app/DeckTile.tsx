import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { HomeDeck } from "../utils/utils";
export default function DeckTile(props: { deck: HomeDeck }) {
	const { deck } = props;
	return (
		<TouchableOpacity>
			<View>
				<Text>{deck.deckName}</Text>
				<FlatList
					data={deck.tags}
					renderItem={({ item }) => <Text>{item}</Text>}
				/>
				<Text>{deck.totalCards} Cards</Text>
			</View>
		</TouchableOpacity>
	);
}
