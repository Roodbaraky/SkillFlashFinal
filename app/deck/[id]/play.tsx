import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { View, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import { DecksContext } from "@/contexts/DecksContext";
import { useLocalSearchParams } from "expo-router";
import { updateCards } from "@/utils/api";
import { useNavigation } from "expo-router";
import { Card } from "@/utils/utils";
import { FlippableCard } from "@/components/FlippableCard";
import LottieView from "lottie-react-native";
import * as Progress from "react-native-progress";
import styles from "@/styling/style";

export default function PlayScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { decks, setDecks } = useContext(DecksContext);
  const deckFromContext = decks.find((d) => d._id === id);
  const [deck, setDeck] = useState(
    deckFromContext?.cards.map((card) => ({ ...card })) as Card[]
  );
  const deckLength = deck.length;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reorderDeck, setReorderDeck] = useState(false);
  const swiperReferenceObject = useRef(null);

  // const [anim, setAnim] = useState({ status: false, yes: false, no: false });

  const handleExit = useCallback(async () => {
    const deckFromCurrentCardOnwards = deck.slice(currentCardIndex);
    const deckBeforeCurrentCard = deck.slice(0, currentCardIndex);
    const newDeck = [...deckFromCurrentCardOnwards, ...deckBeforeCurrentCard];
    if (id) {
      await updateCards(id, newDeck);
    }

    const updatedDecks = decks.map((d) =>
      d._id === id ? { ...d, cards: newDeck } : d
    );
    setDecks(updatedDecks);
  }, [deck, currentCardIndex, id, decks, setDecks]);

  useEffect(() => {
    const exitPage = navigation.addListener("beforeRemove", async (e) => {
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

    // setAnim({ status: true, yes: false, no: true });
    // setTimeout(() => {
    //   setAnim({ status: false, yes: false, no: false });
    // }, 2000);
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
    // setAnim({ status: true, yes: true, no: false });
    // setTimeout(() => {
    //   setAnim({ status: false, yes: false, no: false });
    // }, 2000);
  };

  // const Anim = () => {
  //   return (
  //     <View style={styles.animationContainer}>
  //       {anim.no && (
  //         <LottieView
  //           autoPlay
  //           source={require("../../../assets/fasterN.json")}
  //           style={styles.noSwipeAnimation}
  //         />
  //       )}
        {/* {anim.yes && (
          <LottieView
            autoPlay
            source={require("../../../assets/fasterY.json")}
  //           style={styles.yesSwipeAnimation}
  //         />
  //       )} */}
  //     </View>
  //   );
  // };

  return (
    <View style={styles.playContainer}>
      <Progress.Bar
        progress={(currentCardIndex + 0.1) / deckLength}
        style={styles.deckProgressLoader}
        color="#489FB5"
        unfilledColor="#16697A"
        width={width * 0.25}
        height={height * 0.03}
        borderRadius={20}
        borderWidth={0}
      />
      {/* {anim.status && <Anim />} */}
      <View style={styles.playBackground}>
        <Swiper
          ref={swiperReferenceObject}
          cards={deck}
          renderCard={(card: Card) => (
            <FlippableCard card={card} swiperRef={swiperReferenceObject} />
          )}
          onSwipedLeft={handleLeftSwipe}
          onSwipedRight={handleRightSwipe}
          cardIndex={0}
          backgroundColor={"white"}
          stackSize={3}
          disableBottomSwipe={true}
          infinite
          overlayLabels={{
            left: {
              title: '❌',
              style: {
                label: {
                  backgroundColor: '#16697A',
                  borderColor: 'white',
                  color: 'white',
                  borderWidth: 2,
                  borderRadius:40,
                  transform: "scale(2.8)",
                  userSelect: "none",
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                 
                },
              },
            },
            right: {
              title: '✅',
              style: {
                label: {
                  backgroundColor: '#16697A',
                  borderColor: 'white',
                  borderRadius:40,
                  color: 'white',
                  borderWidth: 2,
                  transform: "scale(2.8)",
                  userSelect: "none",
                  fill:'green'
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                 
                  
                },
              },
            },
          }}
        />
      </View>
    </View>
  );
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
