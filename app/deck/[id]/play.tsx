import React, { useRef, useEffect, useState, useContext, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import Constants from "expo-constants";
import { DecksContext } from "@/contexts/DecksContext";
import { useLocalSearchParams } from "expo-router";
import { updateCards } from "@/utils/api";
import { useNavigation } from "expo-router";
import { Card } from "@/utils/utils";
import { FlippableCard } from "@/components/FlippableCard";


export default function PlayScreen() {
	const navigation = useNavigation();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { decks, setDecks } = useContext(DecksContext);
	const deckFromContext = decks.find((d) => d._id === id);
	const [deck, setDeck] = useState(deckFromContext?.cards.map((card) => ({ ...card })) as Card[]);
	const deckLength = deck.length;
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [reorderDeck, setReorderDeck] = useState(false);
	const swiperReferenceObject = useRef(null);


	const handleExit = useCallback(async () => {
		const deckFromCurrentCardOnwards = deck.slice(currentCardIndex);
		const deckBeforeCurrentCard = deck.slice(0, currentCardIndex);
		const newDeck = [...deckFromCurrentCardOnwards, ...deckBeforeCurrentCard];
		if (id) {
			await updateCards(id, newDeck)
		}

		const updatedDecks = decks.map((d) => (d._id === id ? { ...d, cards: newDeck } : d));
		setDecks(updatedDecks);
	}, [deck, currentCardIndex, id, decks, setDecks]);

	useEffect(() => {
		const exitPage = navigation.addListener('beforeRemove', async (e) => {
			await handleExit();
		});
		return exitPage;
	}, [navigation, handleExit]);

	useEffect(() => {
		if (reorderDeck) {
			const highPriorityCards = deck.filter((card) => card.Y < card.N);
			const remainingCards = deck.filter((card) => card.Y >= card.N);
			const newDeck = [...highPriorityCards, ...remainingCards];
			setDeck(newDeck);
			setReorderDeck(false);
		}
	}, [reorderDeck, deck]);

	const handleLeftSwipe = (cardIndex: number) => {
		const updatedDeck = [...deck];
		updatedDeck[cardIndex] = {
			...updatedDeck[cardIndex],
			N: updatedDeck[cardIndex].N + 1,
		};
		setDeck(updatedDeck);
		setCurrentCardIndex((prevIndex) => {
			const newIndex = prevIndex + 1;
			if (newIndex >= deckLength) {
				setReorderDeck(true);
				return 0;
			}
			return newIndex;
		});
	};

	const handleRightSwipe = (cardIndex: number) => {
		const updatedDeck = [...deck];
		updatedDeck[cardIndex] = {
			...updatedDeck[cardIndex],
			Y: updatedDeck[cardIndex].Y + 1,
		};
		setDeck(updatedDeck);
		setCurrentCardIndex((prevIndex) => {
			const newIndex = prevIndex + 1;
			if (newIndex >= deckLength) {
				setReorderDeck(true);
				return 0;
			}
			return newIndex;
		});
	};

	return (
		<View style={styles.container}>
			<Swiper
				ref={swiperReferenceObject}
				cards={deck}
				renderCard={(card: Card) => <FlippableCard card={card} swiperRef={swiperReferenceObject} />}
				onSwipedLeft={handleLeftSwipe}
				onSwipedRight={handleRightSwipe}
				cardIndex={0}
				backgroundColor={"white"}
				stackSize={3}
				disableBottomSwipe={true}
				infinite
				overlayLabels={{
					left: {
						title: "NO",
						style: {
							label: {
								alignItems: "center",
								backgroundColor: "red",
								color: "white",
								fontSize: 24,
								justifyContent: "center",
								textAlign: "center",
							},
						},
					},
					right: {
						title: "YES",
						style: {
							label: {
								backgroundColor: "green",
								color: "white",
								fontSize: 24,
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
							},
						},
					},
				}}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
	card: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "grey",
		backgroundColor: "white",
		padding: 20,
	},
	text: {
		fontSize: 20,
	},
	button: {
		backgroundColor: "lightgray",
		padding: 10,
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	buttonText: {
		fontSize: 18,
	},
	div: {
		display: "flex",
		alignSelf: 'flex-end',
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		marginTop: 10,
		marginBottom: 10,
	},
});
