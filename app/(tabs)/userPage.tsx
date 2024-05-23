import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View, ScrollView, StyleSheet } from "react-native";
import { UserContext } from "@/contexts/UserContext";
import { getDecksByUsername } from "@/utils/api";
import { HomeDeck } from "@/utils/utils";
import DeckTile from "../../components/DeckTile";
import { DecksContext } from "@/contexts/DecksContext";

export default function HomeScreen() {
	const { userDetails } = useContext(UserContext);
	const { decks, setDecks } = useContext(DecksContext);
	useEffect(() => {
		getDecksByUsername(userDetails.username || "")
			.then((data) => {
				const decksDisplay: HomeDeck[] = [...data] || [];
				return decksDisplay;
			})
			.then((decksDisplay) => {
				setDecks(decksDisplay);
			});
	}, [userDetails.username]);

	return (
		<SafeAreaView testID="home-container">
			<Text>Hi {userDetails.username} !</Text>
			<Text>Welcome to SkillFlash</Text>
			<View>
				<Text>Your decks</Text>
				<ScrollView contentContainerStyle={ styles.scrollViewContent }>
					<FlatList
						data={decks}
						renderItem={({ item }) => <DeckTile deck={item} />}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollViewContent: {
		flexGrow: 1,
		paddingVertical: 10,
		height: "90%"
	}
})
