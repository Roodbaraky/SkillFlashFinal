import React, { useState, RefObject, useEffect } from 'react'
import { Card } from '@/utils/utils';
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import { AntDesign } from '@expo/vector-icons';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';


type FlippableCardProps = { card: Card; swiperRef: RefObject<Swiper<SwiperProps<HTMLElement>>> }



export const FlippableCard = ({ card, swiperRef }: FlippableCardProps) => {

    const [flipped, setFlipped] = useState(false);
    const [clicked, setClicked] = useState({ left: false, middle: false, right: false });

    const handlePress = () => {
        setClicked({ ...clicked, middle: true })
        setFlipped(!flipped);

    };


    const handleRightPress = () => {
        setClicked({ ...clicked, right: true })

        swiperRef.current?.swipeRight();
    }

    const handleLeftPress = () => {
        setClicked({ ...clicked, left: true })

        swiperRef.current?.swipeLeft();
    }

    useEffect(() => {
        if (clicked.middle) {
            setTimeout(() =>
                setClicked((old) => { return { ...old, middle: false } }), 100)
        }
    }, [clicked])

    return (
        <View style={flipped ? styles.flippableDeckCardAlt : styles.flippableDeckCard}>

            <Text style={flipped ? styles.flippableCardTextAlt : styles.flippableCardText}>{flipped ? card.A : card.Q}</Text>

            <View style={styles.flippableCardBtnContainer}>
                <Pressable onPress={(e) => { handleLeftPress() }}><AntDesign name="closecircleo" size={24} color="white" style={clicked.left ? styles.flippableCardNBtnCl : styles.flippableCardNBtn} /></Pressable>
                <Pressable style={clicked.middle ? styles.flippableCardBtnCl : styles.flippableCardBtn} onPress={() => { handlePress(); }}>
                    <Text style={clicked.middle ? styles.flippableCardBtnTextCl : styles.flippableCardBtnText}>Flip Card</Text>
                </Pressable>

                <Pressable onPress={(e) => { handleRightPress() }}><AntDesign name="checkcircleo" size={24} color="white" style={clicked.right ? styles.flippableCardYBtnCl : styles.flippableCardYBtn} /></Pressable>
            </View>

        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({

    flippableDeckCard: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "#489FB5",
        paddingTop: height * 0.25,
        paddingBottom: height * 0.25,
        marginBottom: height * 0.1,
        position: 'relative',
        width: width * 0.5,
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    flippableDeckCardAlt: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "white",
        paddingTop: height * 0.25,
        paddingBottom: height * 0.25,
        marginBottom: height * 0.1,
        position: 'relative',
        width: width * 0.5,
        maxWidth: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    flippableCardText: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        flex: 1,
        textAlignVertical: "center",
        color: "white",
    },
    flippableCardTextAlt: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        flex: 1,
        textAlignVertical: "center",
        color: "#489FB5",
    },
    flippableCardBtn: {
        backgroundColor: "#17697a",
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        opacity: 0.5,
        transform: 'scale(1.5)',
    },
    flippableCardBtnCl: {
        backgroundColor: "lightblue",
        borderColor: "white",
        borderWidth: 1,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        transform: 'scale(1.25)',


    },

    flippableCardYBtn: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform: 'scale(1.7)',
    },
    flippableCardYBtnCl: {
        backgroundColor: "lightgreen",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform: 'scale(1.7)',
    },
    flippableCardNBtn: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform: 'scale(1.7)',

    },
    flippableCardNBtnCl: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform: 'scale(1.7)',

    },

    flippableCardBtnText: {
        fontSize: 24,
        color: 'white',
    },
    flippableCardBtnTextCl: {
        fontSize: 24,
        color: '#17697a'

    },
    flippableCardBtnContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 10,
        position: 'absolute',
        bottom: 25,
    },

});
