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
			<Stack.Screen
				name="index"
				options={{ headerShown: false, headerBackTitle: "Back" }}
			/>
			<Stack.Screen
				name="play"
				options={{ headerShown: false, navigationBarHidden: true }}
			/>
		</Stack>
	);
}
