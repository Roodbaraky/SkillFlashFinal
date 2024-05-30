import React, { useState } from "react";
import { Pressable, Text, View, Image, ImageBackground } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import Signup from "../components/Signup";
import styles from "../styling/style";

export default function Index() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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
    return <Login setIsLoginOpen={setIsLoginOpen} />;
  }
  if (isSignupOpen) {
    return <Signup setIsSignupOpen={setIsSignupOpen} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/SkillFlash(1).png")}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handlePress("login")} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>

          <Pressable
            onPress={() => handlePress("signup")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
