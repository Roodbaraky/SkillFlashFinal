import { UserContext } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import React, { useState } from "react";

export default function HomeLayout() {
	interface User {
		username?: string;
		password?: string;
		email?: string;
		user_id?: string;
		decks?: number[] | null;
		_id?: string;
	}

	return (
		<Stack>
<<<<<<< HEAD:app/(tabs)/Home/_layout.tsx
			{/* <Stack.Screen name="userPage" options={{ headerShown: false }} /> */}
			<Stack.Screen name="deck/[id]" options={{ headerShown: false }} />
			<Stack.Screen name="play" options={{ headerShown: false, navigationBarHidden:true	}} />
=======
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					headerBackTitleVisible: true,
					headerBackTitle: "Back",
				}}
			/>
			<Stack.Screen
				name="play"
				options={{
					headerShown: false,
					headerBackTitleVisible: true,
					headerBackTitle: "Back",
				}}
			/>
>>>>>>> main:app/deck/[id]/_layout.tsx
		</Stack>
	);
}
