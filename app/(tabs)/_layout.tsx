import { HomeDeck } from "@/utils/utils";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { DecksContext } from "../../contexts/DecksContext";
export default function TabsLayout() {
	const [decks, setDecks] = useState<HomeDeck[]>([]);

	return (
		<DecksContext.Provider value={{ decks, setDecks }}>
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
		</DecksContext.Provider>
	);
}

// how to style tabs:
// https://docs.expo.dev/router/advanced/tabs/
