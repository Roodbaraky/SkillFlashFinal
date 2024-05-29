import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, FlatList, Pressable, Alert } from "react-native";
import { DecksContext } from "@/contexts/DecksContext";
import CardTile from "@/components/CardTile";
import { generateMoreQuestions, getDecksByUsername } from "@/utils/api";
import Loading from "../../../components/Loading";
import Error from "@/components/Error";
import { HomeDeck } from "@/utils/utils";
import styles from "@/styling/style";

export default function DeckDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { decks, setDecks } = useContext(DecksContext);

	const router = useRouter();
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	let deck: HomeDeck | undefined = decks.find((deck) => deck._id === id);
	const [generate, setGenerate] = useState(false);
	useEffect(() => {
		deck = decks.find((deck) => deck._id === id);
		if (deck) {
			setIsError(false);
		} else {
			setIsError(true);
		}
	}, [decks, id, generate]);

	const handleGenerateMoreCards = () => {
		Alert.alert(
			"Generate More Cards",
			"Are you sure you want to generate more cards?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => {
						setGenerate(true);
						setIsLoading(true);
						generateMoreQuestions(deck._id, deck?.deckName, deck?.tags)
							.then(() => {
								return getDecksByUsername(deck.username);
							})
							.then((decks) => {
								setDecks(decks);
								setIsLoading(false);
							})
							.catch((err) => {
								console.log(err, "error after generate");
								setIsError(true);
								setIsLoading(false);
							});
					},
				},
			],
			{
				cancelable: true,
			}
		);
	};

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Error />;
	}
	return (
		<SafeAreaView style={styles.container}>
			{deck ? (
				<>
					<Text style={[styles.mediumTitle, styles.lessMargin]}>
						{deck.deckName}
					</Text>
					<View style={styles.buttonContainer}>
						<Pressable
							style={styles.button}
							onPress={() => {
								router.push({
									pathname: `deck/${id}/play`,
								});
							}}
						>
							<Text style={styles.buttonText}>Start Review</Text>
						</Pressable>
						<Pressable style={styles.button} onPress={handleGenerateMoreCards}>
							<Text style={styles.buttonText}>More Cards</Text>
						</Pressable>
					</View>
					<View style={styles.scrollViewContent}>
						<FlatList
							data={deck.cards}
							renderItem={({ item }) => <CardTile card={item} />}
						/>
						<View style={styles.scrollStopper}></View>
					</View>
				</>
			) : (
				<Text>Error Page Here</Text>
			)}
		</SafeAreaView>
	);
}
