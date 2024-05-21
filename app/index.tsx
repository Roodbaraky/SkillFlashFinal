import React, { useContext, useState } from "react";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "@/contexts/UserContext";



export default function Index() {
  const navigation = useNavigation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userDetails, setUserDetails] = useContext(UserContext)

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handlePress = (buttonType: string) => {
    if (buttonType === "login") {
      setIsLoginOpen(true);
      setIsSignupOpen(false);
    } else if (buttonType === "signup") {
      setIsSignupOpen(true);
      setIsLoginOpen(false);
    }
  };

  if (isLoginOpen) {
    return (
      <UserContext.Provider value={[userDetails, setUserDetails]}>
        <Login setIsLoginOpen={setIsLoginOpen} />
      </UserContext.Provider>
    );
  }
  if (isSignupOpen) {
    return (<Signup setIsSignupOpen={setIsSignupOpen} />);
  }

  return (
    <SafeAreaView>
      <UserContext.Provider value={[userDetails, setUserDetails]}>
        <Text>SkillFlash</Text>
        <Pressable onPress={() => handlePress('login')} >
          <Text style={styles.button}>Log in</Text>
        </Pressable>
        <Pressable onPress={() => handlePress('signup')} >
          <Text style={styles.button}>Sign up</Text>
        </Pressable>
      </UserContext.Provider>
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
