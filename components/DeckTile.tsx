import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { HomeDeck } from "../utils/utils";
import { Link } from "expo-router";
const screenWidth = Dimensions.get("window").width;
export default function DeckTile(props: { deck: HomeDeck }) {
	const { deck } = props;
	return (
		<View style={{ flex: 1, marginTop: 10 }}>
			<Link
				href={`deck/${deck._id}`}
				style={{ flex: 1, textDecorationLine: "none" }}
			>
				<View style={styles.container}>
					<Text style={styles.deckName}>{deck.deckName}</Text>
					<View style={styles.tagsContainer}>
						{deck.tags.map((tag, index) => (
							<View key={index} style={styles.tag}>
								<Text style={styles.tagText}>{tag}</Text>
							</View>
						))}
					</View>
					<Text style={styles.cardCount}>{deck.cards.length} cards</Text>
				</View>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		marginVertical: 10,
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
		justifyContent: "center",
		width: screenWidth - 20,
		alignSelf: "center",
	},
	deckName: {
		fontSize: 25,
		textTransform: "capitalize",
		fontWeight: "bold",
		marginBottom: 10,
		textAlign: "center",
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 10,
	},
	tag: {
		padding: 5,
		margin: 5,
		borderRadius: 10,
		backgroundColor: "grey",
	},
	tagText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
		textTransform: "capitalize",
	},
	cardCount: {
		fontSize: 12,
		fontWeight: "bold",
		position: "absolute",
		bottom: 10,
		right: 20,
	},
});
