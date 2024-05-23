import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, ScrollView, StyleSheet, Pressable } from "react-native";
import { DecksContext } from "@/contexts/DecksContext";
import CardTile from "@/components/CardTile";

export default function UserPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { decks } = useContext(DecksContext)
  const deck = decks.find((d)=>d._id === id)

  return (
    <SafeAreaView>
      <Text>{id}</Text>
      {
        deck ? 
        <View>
          <Text>{deck.deckName}</Text>
          <ScrollView contentContainerStyle={ styles.scrollViewContent }>
            <FlatList
              data={deck.cards}
              renderItem={({ item })=><CardTile card={item} />}
            />
          </ScrollView>
            <Pressable>
              {/* onPress to be added */}
              <Text style={styles.button}>more</Text>
            </Pressable>
        </View>

        :
        <Text>Error Page Here</Text>
      }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
    height: "90%",
  },
  button: {
    backgroundColor: "red",
    textAlign: "center",
    width: 50,
    alignSelf: "center",
  }
})