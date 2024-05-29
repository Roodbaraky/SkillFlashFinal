import { Card } from "@/utils/utils";
import { SafeAreaView, Text, StyleSheet, View, Pressable } from "react-native";
import React from "react";

import { categoryColors, findTagCategory } from "@/constants/tags";
import styles from "@/styling/style";
export default function CardTile(props: { card: Card }) {
	const { card } = props;
	const tagCategory = findTagCategory(card.tag);
	const backgroundColor = categoryColors[tagCategory];

	return (
		<SafeAreaView
			style={[styles.cardTileContainer, { borderColor: backgroundColor }]}
		>
			<View
				style={[
					styles.tagButton,
					styles.cardTileTag,
					{ backgroundColor: backgroundColor },
				]}
			>
				<Text style={[styles.tagButtonText, styles.fontSize12]}>
					{card.tag}
				</Text>
			</View>
			<Text style={styles.cardTileQ}>Q: {card.Q}</Text>
			<Text style={styles.stats}>
				Answered correctly: {card.Y}/{card.Y + card.N}
			</Text>
		</SafeAreaView>
	);
}
