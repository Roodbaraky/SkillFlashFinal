import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="userPage"
        options={{
          headerTitle: "Your decks",
        }}
      />
      <Tabs.Screen
        name="deck/[id]"
        options={{
          headerTitle: "Deck",
        }}
      />
    </Tabs>
  );
}

// how to style tabs:
// https://docs.expo.dev/router/advanced/tabs/
