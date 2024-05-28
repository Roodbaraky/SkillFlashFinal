import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BadgeProps {
	label: string;
	count?: number;
	color: string;
	backgroundColor?: string;
}

const Badge: React.FC<BadgeProps> = ({
	label,
	count,
	color,
	backgroundColor,
}) => {
	return (
		<View style={[styles.badgeContainer, { backgroundColor }]}>
			<Text style={[styles.badgeText, { color }]}>
				{count !== undefined ? `${label}: ${count}` : label}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	badgeContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 5,
		borderRadius: 15,
		marginHorizontal: 5,
	},
	badgeText: {
		fontWeight: "bold",
	},
});

export default Badge;
