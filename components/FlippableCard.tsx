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
        <View style={flipped?styles.cardAlt:styles.card}>
           
            <Text style={flipped?styles.textAlt:styles.text}>{flipped ? card.A : card.Q}</Text>

            <View style={styles.div}>
                <Pressable onPress={(e) => { handleLeftPress() }}><AntDesign name="closecircleo" size={24} color="white" style={clicked.left ? styles.NbuttonCl : styles.Nbutton} /></Pressable>
                <Pressable style={clicked.middle ? styles.buttonCl : styles.button} onPress={() => { handlePress(); }}>
                    <Text style={clicked.middle ? styles.buttonTextCl : styles.buttonText}>Flip Card</Text>
                </Pressable>

                <Pressable onPress={(e) => { handleRightPress() }}><AntDesign name="checkcircleo" size={24} color="white" style={clicked.right ? styles.YbuttonCl : styles.Ybutton} /></Pressable>
            </View>

        </View>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
   
    card: {
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
        width:width*0.5,
        maxWidth:500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cardAlt:{
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
        width:width*0.5,
        maxWidth:500,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        flex: 1,
        textAlignVertical: "center",
        color: "white",
    },
    textAlt:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        flex: 1,
        textAlignVertical: "center",
        color: "#489FB5",
    },
    button: {
        backgroundColor: "#17697a",
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        opacity: 0.5,
        transform:'scale(1.5)',
    },
    buttonCl: {
        backgroundColor: "lightblue",
        borderColor: "white",
        borderWidth: 1,
        color: 'white',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
        transform:'scale(1.25)',
        

    },

    Ybutton: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform:'scale(1.7)',
    },
    YbuttonCl: {
        backgroundColor: "lightgreen",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform:'scale(1.7)',
    },
    Nbutton: {
        backgroundColor: "#17697a",
        opacity: 0.5,
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform:'scale(1.7)',

    },
    NbuttonCl: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 10,
        transform:'scale(1.7)',

    },

    buttonText: {
        fontSize: 24,
        color: 'white',
    },
    buttonTextCl: {
        fontSize: 24,
        color: '#17697a'

    },
    div: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 10,
        position: 'absolute',
        bottom: 25,
    },

});
