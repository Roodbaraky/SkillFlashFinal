import { HomeDeck } from "../../utils/utils";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { DecksContext } from "../../contexts/DecksContext";
export default function TabLayout() {
	const [decks, setDecks] = useState<HomeDeck[]>([]);

	return (
		<DecksContext.Provider value={{ decks, setDecks }}>
			<Tabs>
				<Tabs.Screen
					name="userPage"
					options={{
						headerShown: true,
						headerTitle: "Home",
						headerStyle: { backgroundColor: "LightGray" },
					}}
				/>
				<Tabs.Screen
					name="createNew"
					options={{
						headerTitle: "Create New Deck",
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						headerTitle: "My Profile",
					}}
				/>
				<Tabs.Screen
					name="Home"
					options={{
						href: null,
					}}
				/>
			</Tabs>
		</DecksContext.Provider>
	);
}

// how to style tabs:
// https://docs.expo.dev/router/advanced/tabs/
