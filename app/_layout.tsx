import { DecksContext } from "@/contexts/DecksContext";
import { UserContext } from "../contexts/UserContext";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { HomeDeck } from "@/utils/utils";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
	const [decks, setDecks] = useState<HomeDeck[]>([]);
	return (
		<GestureHandlerRootView>
			<UserContext.Provider value={{ userDetails, setUserDetails }}>
				<DecksContext.Provider value={{ decks, setDecks }}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen
							name="deck/[id]"
							options={{
								headerShown: true,
								title: "Home",
								headerBackTitle: "Back",
							}}
						/>
					</Stack>
				</DecksContext.Provider>
			</UserContext.Provider>
		</GestureHandlerRootView>
	);
}
