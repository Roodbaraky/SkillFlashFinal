import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function UserPage() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>{id}</Text>
    </SafeAreaView>
  );
}
