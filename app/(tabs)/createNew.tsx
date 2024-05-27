import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { splitByCategory } from "@/utils/utils";

import { generateDeck, getAllTags } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import { router } from "expo-router";
import TagButton from "@/components/tagButton";
interface Tags {
  category: string;
  tags: string[];
}
interface Error {
  send?: string;
  deckName?: string;
  selection?: string;
}

export default function CreateDeck() {
  const [tags, setTags] = useState<Tags[]>([]);
  const [tagSelection, setTagSelection] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userDetails } = useContext(UserContext);
  const [deckName, setDeckName] = useState<string>("");
  const [isError, setIsError] = useState<Error>({});
  //error state for username, min number of tags
  useEffect(() => {
    getAllTags()
      .then((allTags) => {
        const tagsByCategory = splitByCategory(allTags);
        setTags(tagsByCategory);
      })
      .catch((err) => {});
  }, []);

  function checkField(field: string) {
    if (field === "deckName" && deckName.length < 3) {
      setIsError({
        ...isError,
        deckName: "Deck name must be at lest 3 characters long",
      });
    } else if (field === "deckName" && deckName.length >= 3) {
      setIsError({
        ...isError,
        deckName: "",
      });
    }
    if (field === "selection" && tagSelection.length < 3) {
      setIsError({
        ...isError,
        selection: "Please select at least 3 tags",
      });
    } else if (field === "selection" && tagSelection.length > 2) {
      setIsError({
        ...isError,
        selection: "",
      });
    }
  }

  function sendRequest() {
    if (deckName.length < 3 && tagSelection.length < 3) {
      setIsError({
        ...isError,
        deckName: "Deck name must be at least 3 characters long",
        selection: "Please select at least 3 tags",
      });
    } else if (deckName.length < 3) {
      setIsError({
        ...isError,
        deckName: "Deck name must be at lest 3 characters long",
      });
    } else if (tagSelection.length < 3) {
      setIsError({
        ...isError,
        selection: "Please select at least 3 tags",
      });
    } else {
      setIsError({});
      setIsLoading(true);
      generateDeck(userDetails.username, deckName, tagSelection)
        .then((deck) => {
          console.log(deck);
          if (deck) {
            const id = deck._id;
            router.replace(`Home/deck/${id}`);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError({
            send: "Sorry, there has been a problem handling your request. Please try again.",
          });
          console.log(err);
        });
    }
  }
  if (isLoading) return <Text> Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>
        Allow AI to generate a deck of cards tailored for you
      </Text>
      <Text style={styles.label}>
        1. Choose a unique name for your new deck:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setDeckName(text);
          setIsError({ ...isError, deckName: "" });
        }}
        onBlur={() => {
          checkField("deckName");
        }}
        value={deckName}
        placeholder="e.g. the role you are applying to ..."
        id="deckName"
      />
      {isError.deckName ? (
        <Text style={styles.error}>{isError.deckName}</Text>
      ) : (
        <></>
      )}

      <Text style={styles.label}>
        2. Select 3 to 10 tags that match the job description:
      </Text>

      <View style={styles.tagSelection}>
        {tagSelection &&
          tagSelection.map((tag) => {
            return (
              <TagButton
                key={tag}
                text={tag}
                onPress={() => {
                  setTagSelection((currentSelection) => {
                    const filtered = currentSelection.filter(
                      (item) => item !== tag
                    );

                    return filtered;
                  });
                }}
              />
            );
          })}
      </View>

      {isError.selection ? <Text>{isError.selection}</Text> : <></>}

      <View style={styles.tagListContainer}>
        {tags &&
          tags.map((category) => {
            return (
              <View style={styles.categoryContainer} key={category.category}>
                <Text style={styles.categoryTitle}>{category.category}</Text>
                {category.tags &&
                  category.tags.map((tag) => {
                    return (
                      <TagButton
                        key={tag}
                        text={tag}
                        onPress={() => {
                          setTagSelection((currentSelection) => {
                            if (
                              tagSelection &&
                              !tagSelection.includes(tag) &&
                              tagSelection.length < 10
                            ) {
                              return [...currentSelection, tag];
                            }
                            return currentSelection;
                          });
                          //if tagSelection.includes item => change color
                        }}
                      />
                    );
                  })}
              </View>
            );
          })}
      </View>

      <Pressable onPress={sendRequest}>
        <Text>Press to generate your cards!</Text>
      </Pressable>
      {isError.send ? <Text>{isError.send}</Text> : <></>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  pageTitle: {
    fontSize: 25,
    textAlign: "center",
    margin: 20,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 350,
  },
  tagSelection: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 100,
    flexBasis: "auto",
    flexShrink: 1,
    justifyContent: "flex-start",
  },
  tagListContainer: {
    flex: 1,
    overflow: "scroll",
    gap: 20,
    height: "auto",
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 200,
    flexBasis: "auto",
    flexShrink: 1,
    justifyContent: "flex-start",
    rowGap: 5,
  },
  categoryTitle: {
    margin: 10,
    width: 300,
    backgroundColor: "white",
    fontWeight: 500,
    lineHeight: 25,
  },

  error: {
    color: "red",
  },
});
