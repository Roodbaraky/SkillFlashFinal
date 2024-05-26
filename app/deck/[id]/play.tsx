import React, { useRef, useEffect, useState, useContext } from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import Constants from "expo-constants";
import { DecksContext } from "@/contexts/DecksContext";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface Card {
	Q: string;
	A: string;
	Y: number;
	N: number;
	tag: string;
}

export default function PlayScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	console.log(id);
	const { decks } = useContext(DecksContext);
	const deckText = decks.find((d) => d._id === id);
	if (!deckText) throw new Error("Deck not found");
	const [deck, setDeck] = useState(
		deckText.cards.map((card) => ({ ...card })) as Card[]
	);

	const [currentCardIndex, setCurrentCardIndex] = useState(0);

	const swiperRef = useRef(null);

	useEffect(() => {
		if (currentCardIndex === deck.length - 1) {
			setDeck((oldDeck) => {
				console.log("check card ratios and apply logic to rearrange deck...");
				const highPriorityCards = oldDeck.filter((card) => card.Y < card.N);
				const remainingCards = oldDeck.filter((card) => card.Y > card.N);
				return [...highPriorityCards, ...remainingCards];
			});
		}
	}, [currentCardIndex, deck.length]);

	const handleLeftSwipe = (cardIndex: number) => {
		setDeck((prevDeck) => {
			const newDeck = [...prevDeck];
			newDeck[cardIndex] = {
				...newDeck[cardIndex],
				N: newDeck[cardIndex].N + 1,
			};
			setCurrentCardIndex(cardIndex);
			return newDeck;
		});
		console.log("Left swipe:", deck[cardIndex]);
	};

	const handleRightSwipe = (cardIndex: number) => {
		setDeck((prevDeck) => {
			const newDeck = [...prevDeck];
			newDeck[cardIndex] = {
				...newDeck[cardIndex],
				Y: newDeck[cardIndex].Y + 1,
			};
			setCurrentCardIndex(cardIndex);
			return newDeck;
		});
		console.log("Right swipe:", deck[cardIndex]);
	};

	return (
		<View style={styles.container}>
			<Swiper
				ref={swiperRef}
				cards={deck}
				renderCard={(card: Card) => (
					<FlippableCard card={card} swiperRef={swiperRef} />
				)}
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

const FlippableCard = ({ card, swiperRef }) => {
	const [flipped, setFlipped] = useState(false);
	const handlePress = () => {
		setFlipped(!flipped);
	};

	return (
		<View style={styles.card}>
			<Text style={styles.text}>{flipped ? card.A : card.Q}</Text>
			<View style={styles.div}>
				<Pressable
					onPress={() => {
						swiperRef.current.swipeLeft();
					}}
				>
					<AntDesign
						name="closecircleo"
						size={24}
						color="black"
						style={styles.button}
					/>
				</Pressable>
				<Pressable
					style={styles.button}
					onPress={() => {
						console.log(swiperRef.current);
						swiperRef.current.animateStack();
						handlePress();
					}}
				>
					<Text style={styles.buttonText}>Flip Card</Text>
				</Pressable>
				<Pressable
					onPress={() => {
						swiperRef.current.swipeRight();
					}}
				>
					<AntDesign
						name="checkcircleo"
						size={24}
						color="black"
						style={styles.button}
					/>
				</Pressable>
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
		alignSelf: "flex-end",
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "100%",
		marginTop: 10,
		marginBottom: 10,
	},
});
