import React, { useRef, useEffect, useState, useContext, useCallback} from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { DecksContext } from "@/contexts/DecksContext";
import { useLocalSearchParams } from "expo-router";

import { updateCards } from "@/utils/api";
import { useNavigation } from "expo-router";
import { Card } from "@/utils/utils";
import { FlippableCard } from "@/components/FlippableCard";
import LottieView from "lottie-react-native";

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

	const [anim, setAnim] = useState({ status: false, yes: false, no: false });

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

		setAnim({ status: true, yes: false, no: true });
		setTimeout(() => {
			setAnim({ status: false, yes: false, no: false });
		}, 2000); 
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
		setAnim({ status: true, yes: true, no: false });
		setTimeout(() => {
			setAnim({ status: false, yes: false, no: false });
		}, 2000); 
	};

	const Anim = () => {
		return (
			<View style={styles.animContainer}>
				{anim.no && <LottieView autoPlay source={require('../../../assets/fasterN.json')} style={styles.noAnim} />}
				{anim.yes && <LottieView autoPlay source={require('../../../assets/fasterY.json')} style={styles.yesAnim} />}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{anim.status && <Anim />}
			<View style={styles.background}>
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
				/>
			</View>
		</View>
	);
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
	noAnim: {
		width: width * 0.5,
		
	},
	yesAnim: {
		width: width * 0.5,
		
	},
	animContainer: {
		position: 'absolute',
		zIndex: 1000,
		width: width*0.15,
		left:0,
		right:0,
		top: height * 0.0075,
		marginRight:'auto',
		marginLeft:'auto',
	
	},
	background: {
		backgroundColor: '#16697A',
		
	},
	container: {
		flex: 1,
		backgroundColor: "##16697A",
		
	},
	card: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "grey",
		backgroundColor: "white",
		padding: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginBottom: 10,
	},
	text: {
		fontSize: 20,
		textAlign: "center",
		flex: 1,
		textAlignVertical: "center",
	},
	button: {
		backgroundColor: "lightgray",
		padding: 10,
		borderRadius: 10,
		marginHorizontal: 10,
	},
	buttonText: {
		fontSize: 18,
	},
	div: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingVertical: 10,
	},
	icon: {
		paddingHorizontal: 20,
	},
});
