import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HomeDeck } from "../utils/utils";
import { Link } from "expo-router";
export default function DeckTile(props: { deck: HomeDeck }) {
	const { deck } = props;
	return (
		<View style={styles.container}>
			<Link href={`deck/${deck._id}`}>
				<Text style={styles.deckName}>{deck.deckName}</Text>
				<View style={styles.tagsContainer}>
					{deck.tags.map((tag, index) => (
						<View key={index} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>
				<Text style={styles.cardCount}>{deck.cards.length} cards</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 10,
		marginLeft: "auto",
		marginRight: "auto",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "black",
		backgroundColor: "white",
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: 120,
		width: "95%",
		alignItems: "center",
		justifyContent: "center",
	},
	deckName: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 20,
		margin: 20,
		marginLeft: "auto",
		marginRight: "auto",
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 10,
		width: "100%",
	},
	tag: {
		padding: 5,
		margin: 5,
		borderRadius: 10,
		backgroundColor: "grey",
		color: "white",
	},
	tagText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold",
		textAlign: "right",
	},
	cardCount: {
		fontSize: 12,
		fontWeight: "bold",
		position: "absolute",
		bottom: 10,
		right: 20,
	},
});
