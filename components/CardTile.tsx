import { Card } from "@/utils/utils";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import React from "react";
import Badge from "./Badge";
import tags from "@/constants/tags";

const categoryColors: { [key: string]: string } = {
	"technical-skills": "#1E90FF",
	"problem-solving": "#32CD32",
	"system-design": "#FFA500",
	behavioral: "#9370DB",
	"practical-knowledge": "#008080",
	Default: "#9e9e9e",
};

export default function CardTile(props: { card: Card }) {
	const { card } = props;
	const tag = tags.find(
		(tag) => tag.tagName.toLowerCase() === card.tag.toLowerCase()
	);
	const backgroundColor =
		(tag?.tagCategory && categoryColors[tag.tagCategory]) ||
		categoryColors["Default"];

	return (
		<SafeAreaView style={[styles.container, { borderColor: backgroundColor }]}>
			<Text style={styles.q}>Q: {card.Q}</Text>
			<Badge label={card.tag} color="#fff" backgroundColor={backgroundColor} />
			{/* <Text style={styles.tag}>Tag: {card.tag}</Text> */}
			<View style={styles.badgesContainer}>
				<Badge
					label="Yes"
					count={card.Y}
					color="#fff"
					backgroundColor="green"
				/>
				<Badge label="No" count={card.N} color="#fff" backgroundColor="red" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		margin: 10,
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
	},
	q: {
		margin: 10,
	},
	tag: {
		textAlign: "center",
		fontSize: 15,
		borderRadius: 5,
		backgroundColor: "lightgray",
		margin: 10,
		padding: 10,
	},
	badgesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
