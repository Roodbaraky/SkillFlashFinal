import { UserContext } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import React, { useState } from "react";

export default function RootLayout() {
  interface User {
    username?: string;
    password?: string;
    email?: string;
    user_id?: string;
    decks?: number[] | null
  }

  const [userDetails, setUserDetails] = useState<User>({});
  return (
    <Stack>
      <UserContext.Provider value={[userDetails, setUserDetails]}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Signup" />
        <Stack.Screen name="home" />
      </UserContext.Provider>
    </Stack>
  );
}

