import React, { useRef, useEffect, useState, useContext } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import Constants from "expo-constants";
import { DecksContext } from "@/contexts/DecksContext";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { updateCards } from "@/utils/api";
import { useNavigation } from "expo-router";

interface Card {
	Q: string;
	A: string;
	Y: number;
	N: number;
	tag: string;
}

export default function PlayScreen() {
	const navigation = useNavigation();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { decks, setDecks } = useContext(DecksContext);
	console.log(decks)
	const deckFromContext = decks.find((d) => d._id === id);
	if (!deckFromContext) throw new Error("Deck not found");
	window.addEventListener('touchstart', (e) => { console.log(e) });
	window.addEventListener('click', (e) => { console.log(e) });
	navigation.addListener('beforeRemove', (e) => {
		console.log(e);
		handleExit();
	});
	const [deck, setDeck] = useState(deckFromContext.cards.map((card) => ({ ...card })) as Card[]);
	const deckLength = deck.length;
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [reorderDeck, setReorderDeck] = useState(false);

	const swiperRef = useRef(null);

	async function handleExit() {

		console.log("exiting");
		const firstCut = deck.slice(currentCardIndex);
		const secondCut = deck.slice(0, currentCardIndex);
		const newDeck = [...firstCut, ...secondCut];
		console.log(newDeck, '<--- saved deck order');
		await updateCards(id, newDeck);
		const existingDecks = decks.filter((d) => d._id !== id)
		const alteredDeck = { ...deckFromContext, cards: newDeck };
		console.log(existingDecks)
		//this may understandably become a problem, suggest applying some sort of .sort on decks list 
		existingDecks.unshift(alteredDeck);
		console.log(existingDecks)
		setDecks(existingDecks)
	}

	useEffect(() => {
		if (reorderDeck) {
			console.log("check card ratios and apply logic to rearrange deck...");
			const highPriorityCards = deck.filter((card) => card.Y < card.N);
			const remainingCards = deck.filter((card) => card.Y >= card.N);
			const newDeck = [...highPriorityCards, ...remainingCards];
			console.log(highPriorityCards, '<--- high priority cards');
			console.log(remainingCards, '<--- remaining cards');
			console.log(newDeck);
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
		console.log("Left swipe:", updatedDeck[cardIndex]);
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
		console.log("Right swipe:", updatedDeck[cardIndex]);
	};

	return (
		<View style={styles.container}>
			<Swiper
				ref={swiperRef}
				cards={deck}
				renderCard={(card: Card) => <FlippableCard card={card} swiperRef={swiperRef} handleExit={handleExit} />}
				onSwiped={(cardIndex) => {
					console.log("Card index:", cardIndex);
					console.log("deck in state --> ", deck);
					console.log("current card index --> ", currentCardIndex);
				}}
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

const FlippableCard = ({ card, swiperRef, handleExit }) => {
	const [flipped, setFlipped] = useState(false);
	const handlePress = () => {
		setFlipped(!flipped);
	};

	return (
		<View style={styles.card}>
			<Text style={styles.text}>{flipped ? card.A : card.Q}</Text>
			<View style={styles.div}>
				<Pressable onPress={() => { swiperRef.current.swipeLeft(); }}><AntDesign name="closecircleo" size={24} color="black" style={styles.button} /></Pressable>
				<Pressable style={styles.button} onPress={() => {
					console.log(swiperRef.current);
					swiperRef.current.animateStack();
					handlePress();
				}}>
					<Text style={styles.buttonText}>Flip Card</Text>
				</Pressable>
				<Pressable onPress={handleExit}><AntDesign name="checkcircle" size={24} color="black" style={styles.button} /></Pressable>
				<Pressable onPress={() => { swiperRef.current.swipeRight(); }}><AntDesign name="checkcircleo" size={24} color="black" style={styles.button} /></Pressable>
			</View>
		</View>
	);
};

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
