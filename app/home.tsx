import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { UserContext } from "@/contexts/UserContext";

export default function home() {
  const { userDetails } = useContext(UserContext);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
