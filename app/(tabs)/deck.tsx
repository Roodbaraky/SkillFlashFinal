import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { deleteDeck, getDecksByUsername } from "../../utils/api";
import DeckTile from "../../components/DeckTile";
import { DecksContext } from "../../contexts/DecksContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import Error from "../../components/Error";
import styles from "@/styling/style";

export default function TabOneScreen() {
  const { userDetails } = useContext(UserContext);
  const { decks, setDecks } = useContext(DecksContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getDecksByUsername(userDetails.username || "")
      .then((data) => {
        setIsLoading(false);
        const invertedArray = data.reverse();
        setDecks(invertedArray);
      })
      .catch(() => {
        setError(true);
      });
  }, [userDetails.username]);

  const deleteRow = (rowKey: string) => {
    const newData = decks.filter((item) => item._id !== rowKey);
    setDecks(newData);
    deleteDeck(rowKey).catch(() => {
      setError(true);
      Alert.alert("Error", "Failed to delete deck");
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <SafeAreaView testID="home-container" style={styles.container}>
      <View>
        <Text style={[styles.mediumTitle, styles.lessMargin]}>
          Hi {userDetails.username},
        </Text>
        <Text style={[styles.mediumTitle, styles.lessMargin]}>
          Welcome to SkillFlash!
        </Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <Text style={[styles.smallTitle, styles.alignLeft]}>
          Choose a deck to start practicing:
        </Text>
        {!decks.length && (
          <Text style={styles.smallTitle}>
            Sorry, you don't have any decks to display. Start your learning
            journey by pressing on the "Create Deck' button below!
          </Text>
        )}
        <SwipeListView
          disableRightSwipe
          data={decks}
          keyExtractor={(item) => item._id}
          renderItem={(data, rowMap) => (
            <View style={styles.deckTileFront}>
              <DeckTile deck={data.item} />
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.deckTileBack}>
              <TouchableOpacity
                style={styles.backRightBtn}
                onPress={() =>
                  Alert.alert(
                    "Delete deck",
                    "Are you sure you want to delete? This action cannot be reversed.",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "OK", onPress: () => deleteRow(data.item._id) },
                    ]
                  )
                }
              >
                <Feather name="trash-2" size={35} color="red" />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={0}
          rightOpenValue={-75}
        />
      </View>
    </SafeAreaView>
  );
}
