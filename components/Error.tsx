import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

import { Pressable, Text } from "react-native";
import styles from "@/styling/style";
import { router } from "expo-router";

export default function Error() {
  const animation = useRef(null);

  return (
    <SafeAreaView style={styles.animationContainer}>
      <Text style={styles.animationTitle}>Oops ... Something went wrong!</Text>

      <LottieView
        autoPlay
        ref={animation}
        style={styles.animationError}
        source={require("../assets/Error.json")}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          router.replace("deck");
        }}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}
