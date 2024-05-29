import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import styles from "@/styling/style";
import { Text } from "react-native";
export default function Error() {
  const animation = useRef(null);

  return (
    <SafeAreaView style={styles.animationContainer}>
      <Text style={styles.animationTitle}>Please wait...</Text>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.animationLoading}
        source={require("../assets/loading.json")}
      />
    </SafeAreaView>
  );
}
