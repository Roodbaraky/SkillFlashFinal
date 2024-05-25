import {
  FlatList,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { splitByCategory } from "@/utils/utils";

import { generateDeck, getAllTags } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import { router } from "expo-router";
interface Tags {
  category: string;
  tags: string[];
}

export default function CreateDeck() {
  const [tags, setTags] = useState<Tags[]>([]);
  const [tagSelection, setTagSelection] = useState<string[]>([]);
  const [isSendPressed, setIsSendPressed] = useState<boolean>(false);
  const { userDetails } = useContext(UserContext);
  const [deckName, setDeckName] = useState<string>();
  //error state for username, min number of tags
  useEffect(() => {
    getAllTags()
      .then((allTags) => {
        const tagsByCategory = splitByCategory(allTags);
        setTags(tagsByCategory);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function sendRequest() {
    setIsSendPressed(true);
    generateDeck(userDetails.username, deckName, tagSelection)
      .then((deck) => {
        console.log(deck);
        if (deck) {
          const id = deck._id;
          router.replace(`Home/deck/${id}`);
        }
      })
      .catch((err) => {
        setIsSendPressed(false);
        console.log(err);
      });
  }
  if (isSendPressed) return <Text> Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Create new Deck Here</Text>
      <Text style={styles.label}>Deck name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setDeckName(text);
        }}
        value={deckName}
        placeholder="Deck Name"
        id="deckName"
      />
      <Text>You tags selection:</Text>
      <FlatList
        data={tagSelection}
        renderItem={(tag) => {
          return (
            <Pressable
              style={styles.tag}
              onPress={() => {
                setTagSelection((currentSelection) => {
                  const filtered = currentSelection.filter(
                    (item) => item !== tag.item
                  );

                  return filtered;
                });
              }}
            >
              <Text style={styles.tagText}>{tag.item}</Text>
            </Pressable>
          );
        }}
      />
      <Pressable onPress={sendRequest}>
        <Text>Send</Text>
      </Pressable>

      <SectionList
        sections={tags}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Pressable
            style={styles.tag}
            onPress={() => {
              setTagSelection((currentSelection) => [
                ...currentSelection,
                item,
              ]);
            }}
          >
            <Text style={styles.tagText}>{item}</Text>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        style={styles.row}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  pageTitle: {
    fontSize: 30,
  },
  selectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  box: {
    width: 100,
    height: 80,
  },
  row: { flex: 1, flexDirection: "row", flexWrap: "wrap" },

  header: {
    fontSize: 20,
    backgroundColor: "#fff",
  },

  tag: {
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "grey",
    color: "white",
    width: 100,
    display: "",
  },
  tagText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
});
