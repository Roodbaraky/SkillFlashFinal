import { Card } from "@/utils/utils";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function CardTile(props: { card: Card }) {
	const { card } = props;
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.q}>Q: {card.Q}</Text>
			<Text style={styles.tag}>Tag: {card.tag}</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
		margin: 10,
		borderWidth: 1,
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
});
