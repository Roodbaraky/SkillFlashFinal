import React, { useState, RefObject, useEffect } from "react";
import { Card } from "@/utils/utils";
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import styles from "@/styling/style";

type FlippableCardProps = {
  card: Card;
  swiperRef: RefObject<Swiper<SwiperProps<HTMLElement>>>;
};

export const FlippableCard = ({ card, swiperRef }: FlippableCardProps) => {
  const [flipped, setFlipped] = useState(false);
  const [clicked, setClicked] = useState({
    left: false,
    middle: false,
    right: false,
  });

  const handlePress = () => {
    setClicked({ ...clicked, middle: true });
    setFlipped(!flipped);
  };

  const handleRightPress = () => {
    setClicked({ ...clicked, right: true });

    swiperRef.current?.swipeRight();
  };

  const handleLeftPress = () => {
    setClicked({ ...clicked, left: true });

    swiperRef.current?.swipeLeft();
  };

  useEffect(() => {
    if (clicked.middle) {
      setTimeout(
        () =>
          setClicked((old) => {
            return { ...old, middle: false };
          }),
        100
      );
    }
  }, [clicked]);

  return (
    <View
      style={flipped ? styles.flippableDeckCardAlt : styles.flippableDeckCard}
    >
      <Text
        style={flipped ? styles.flippableCardTextAlt : styles.flippableCardText}
      >
        {flipped ? card.A : card.Q}
      </Text>

      <View style={styles.flippableCardBtnContainer}>
        {flipped&& <Pressable
          onPress={(e) => {
            handleLeftPress();
          }}
        >
          <AntDesign
            name="closecircleo"
            size={20}
            color="white"
            style={
              clicked.left
                ? styles.flippableCardNBtnCl
                : styles.flippableCardNBtn
            }
          />
        </Pressable>}
        <Pressable
          style={
            clicked.middle ? styles.flippableCardBtnCl : styles.flippableCardBtn
          }
          onPress={() => {
            handlePress();
          }}
        >
          <Text
            style={
              clicked.middle
                ? styles.flippableCardBtnTextCl
                : styles.flippableCardBtnText
            }
          >
            Flip Card
          </Text>
        </Pressable>

        {flipped && <Pressable
          onPress={(e) => {
            handleRightPress();
          }}
        >
          <AntDesign
            name="checkcircleo"
            size={20}
            color="white"
            style={
              clicked.right
                ? styles.flippableCardYBtnCl
                : styles.flippableCardYBtn
            }
          />
        </Pressable>}
      </View>
    </View>
  );
};
