import React, { useState, RefObject } from 'react'
import { Card } from '@/utils/utils';
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants  from 'expo-constants';

type FlippableCardProps = { card: Card; swiperRef: RefObject<Swiper<SwiperProps<HTMLElement>>> }

export const FlippableCard = ({ card, swiperRef }: FlippableCardProps) => {
    const [flipped, setFlipped] = useState(false);
    const handlePress = () => {
        setFlipped(!flipped);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.text}>{flipped ? card.A : card.Q}</Text>
            <View style={styles.div}>
                <Pressable onPress={() => { swiperRef.current?.swipeLeft(); }}><AntDesign name="closecircleo" size={24} color="black" style={styles.button} /></Pressable>
                <Pressable style={styles.button} onPress={() => { handlePress(); }}>
                    <Text style={styles.buttonText}>Flip Card</Text>
                </Pressable>

                <Pressable onPress={() => { swiperRef.current?.swipeRight(); }}><AntDesign name="checkcircleo" size={24} color="black" style={styles.button} /></Pressable>
            </View>
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
    }
});