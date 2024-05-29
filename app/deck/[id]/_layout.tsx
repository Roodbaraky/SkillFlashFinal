import { UserContext } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";

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
					headerTitle: "Home",

					headerLeft: () => (
						<View style={{ flexDirection: "row" }}>
							<Pressable onPress={() => router.replace("/deck")}>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Ionicons name="chevron-back" size={24} color="white" />
									<Text style={{ color: "#fff", fontSize: 22, marginLeft: 3 }}>
										Back
									</Text>
								</View>
							</Pressable>
						</View>
					),

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
					headerTitle: "Back",
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
