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
				options={{
					headerShown: true,
					headerBackTitle: "Back",
					headerTitle:'Home',
					headerStyle: { backgroundColor: "#489FB5" },
								headerTintColor: "#fff",
								headerTitleStyle: {
									fontWeight: "bold",
									fontSize: 25,
								},
				}}
			/>
			<Stack.Screen
				name="play"
				options={{
					headerShown: true,
					navigationBarHidden: true,
					headerTitle:'Back',
					headerStyle: { backgroundColor: "#489FB5" },
								headerTintColor: "#fff",
								headerTitleStyle: {
									fontWeight: "bold",
									fontSize: 25,
								},
				}}
			/>
		</Stack>
	);
}
