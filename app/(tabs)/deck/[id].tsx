import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import {
	Text,
	View,
	FlatList,
	ScrollView,
	StyleSheet,
	Pressable,
} from "react-native";
import { DecksContext } from "@/contexts/DecksContext";
import CardTile from "@/components/CardTile";

export default function UserPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { decks } = useContext(DecksContext);
	const deck = decks.find((d) => d._id === id);

	return (
		<SafeAreaView>
			{deck ? (
				<View>
					<Text
						style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
					>
						{deck.deckName}
					</Text>
					<ScrollView contentContainerStyle={styles.scrollViewContent}>
						<FlatList
							data={deck.cards}
							renderItem={({ item }) => <CardTile card={item} />}
						/>
					</ScrollView>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							padding: 10,
						}}
					>
						<Pressable>
							{/* onPress to be added */}
							<Text style={styles.button}>Generate More Cards</Text>
						</Pressable>
						<Pressable>
							{/* onPress to be added */}
							<Text style={styles.button}>Start Review</Text>
						</Pressable>
					</View>
				</View>
			) : (
				<Text>Error Page Here</Text>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollViewContent: {
		flexGrow: 1,
		paddingVertical: 10,
		height: "80%",
	},
	button: {
		backgroundColor: "lightblue",
		textAlign: "center",
		width: 100,
		alignSelf: "center",
		padding: 10,
		borderRadius: 10,
	},
});
