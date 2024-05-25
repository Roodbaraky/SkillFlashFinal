import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
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

export default function DeckDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { decks } = useContext(DecksContext);
	const deck = decks.find((d) => d._id === id);
	const router = useRouter();
	return (
		<SafeAreaView>
			<Pressable
				onPress={() => {
					router.push({
						pathname: `deck/${id}/play`,
						params: { id: id },
					});
				}}
			>
				{/* onPress to be added */}
				<Text style={styles.button}>Start Review</Text>
			</Pressable>
			<Pressable
				onPress={() => router.back()}
				style={{
					padding: 10,
					backgroundColor: "lightblue",
					width: 70,
					margin: 10,
					borderRadius: 10,
				}}
			>
				<Text>Back</Text>
			</Pressable>
			{deck ? (
				<View style={styles.scrollViewContent}>
					<Text
						style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
					>
						{deck.deckName}
					</Text>
					<FlatList
						data={deck.cards}
						renderItem={({ item }) => <CardTile card={item} />}
					/>
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
