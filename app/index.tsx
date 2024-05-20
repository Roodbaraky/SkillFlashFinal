import React, { useState } from "react";

import { Link, Stack, useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import Signup from "./Signup";

interface User {
  username: string;
  password: string;
  email: string;
  user_id: string;
  decks: Array<number | null>;
}

export default function Index() {
  const navigation = useNavigation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handlePress = (e: { target: { innerText: any } }) => {
    if (e.target.innerText === "Log in") {
      setIsLoginOpen(true);
      setIsSignupOpen(false);
    } else if (e.target.innerText === "Sign up") {
      setIsSignupOpen(true);
      setIsLoginOpen(false);
    }
  };

  if (isLoginOpen) {
    return (
      <Login setIsLoginOpen={setIsLoginOpen} setUserDetails={setUserDetails} />
    );
  }
  if (isSignupOpen) {
    return <Signup setIsSignupOpen={setIsSignupOpen} />;
  }

  return (
    <SafeAreaView>
      <Text>SkillFlash</Text>

      <Pressable onPress={handlePress}>
        <Text style={styles.button}>Log in</Text>
      </Pressable>

      <Pressable onPress={handlePress}>
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logInContainer: {
    flex: 1,
    paddingTop: 58,
    alignSelf: "center",
  },
  title: {
    fontSize: 50,
    color: "black",
    marginTop: 100,
    marginBottom: 20,
    alignSelf: "center",
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
  button: {
    alignSelf: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: 5,
  },
});
