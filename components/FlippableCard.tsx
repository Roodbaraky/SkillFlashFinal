import React, { useState, RefObject, useEffect } from 'react'
import { Card } from '@/utils/utils';
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import { AntDesign } from '@expo/vector-icons';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';


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
        <View style={styles.card}>
            <Text style={styles.text}>{flipped ? card.A : card.Q}</Text>

            <View style={styles.div}>
                <Pressable onPress={(e) => { handleLeftPress() }}><AntDesign name="closecircleo" size={24} color="white" style={clicked.left ? styles.NbuttonCl : styles.Nbutton} /></Pressable>
                <Pressable style={clicked.middle ? styles.buttonCl : styles.button} onPress={() => { handlePress(); }}>
                    <Text style={clicked.middle ? styles.buttonTextCl:styles.buttonText}>Flip Card</Text>
                </Pressable>

                <Pressable onPress={(e) => { handleRightPress() }}><AntDesign name="checkcircleo" size={24} color="white" style={clicked.right ? styles.YbuttonCl : styles.Ybutton} /></Pressable>
            </View>

        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#17697a",
        padding: 8,
    },
    card: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: "#97e3dd",
        paddingTop: height*0.25,   
        position: 'relative',
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin:width*0.05,
        flex: 1,
        textAlignVertical: "center",
      
        
    },
    button: {
        backgroundColor: "#17697a",
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        opacity: 0.5,
    },
    buttonCl: {
        backgroundColor: "lightblue",
        borderColor: "white",
        borderWidth:1,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,

    },

    Ybutton: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    YbuttonCl: {
        backgroundColor: "lightgreen",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
    },
    Nbutton: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,

    },
    NbuttonCl: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,

    },

    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    buttonTextCl: {
        fontSize: 18,
        color:'#17697a'
       
    },
    div: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 10,
        position: 'absolute',
        bottom: 10,
    },

});
