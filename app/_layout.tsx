import { UserContext } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import React, { useState } from "react";

export default function RootLayout() {
	interface User {
		username?: string;
		password?: string;
		email?: string;
		user_id?: string;
		decks?: number[] | null;
		_id?: string;
	}

	const [userDetails, setUserDetails] = useState<User>({ username: "ana" });

	return (
		<UserContext.Provider value={{ userDetails, setUserDetails }}>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
		</UserContext.Provider>
	);
}
