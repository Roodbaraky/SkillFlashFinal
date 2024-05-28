import { HomeDeck } from "../../utils/utils";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { DecksContext } from "../../contexts/DecksContext";
import { TabBarIcon } from "@/components-example/navigation/TabBarIcon";
export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="deck"
				options={{
					title: "Home",
					tabBarActiveTintColor: "white",
					headerShown: true,
					headerTitle: "Home",
					tabBarLabelStyle: {
						fontSize: 17,
						fontWeight: "bold",
						color: "white",
					},
					headerTitleAlign: "center",
					tabBarStyle: { backgroundColor: "#489FB5" },
					headerStyle: { backgroundColor: "#489FB5" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: "bold",
					},
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={"white"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="createNew"
				options={{
					title: "Create Deck",
					tabBarLabelStyle: {
						fontSize: 17,
						fontWeight: "bold",
						color: "white",
					},
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: "bold",
					},
					tabBarStyle: { backgroundColor: "#489FB5" },
					tabBarActiveTintColor: "#16697A",
					headerTitle: "Create New Deck",
					headerTitleAlign: "center",
					headerStyle: { backgroundColor: "#489FB5" },
					headerTintColor: "#fff",

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle" : "add-circle-outline"}
							color={"white"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "My Profile",
					tabBarLabelStyle: {
						fontSize: 17,
						fontWeight: "bold",
						color: "white",
					},
					tabBarActiveTintColor: "#16697A",
					tabBarStyle: { backgroundColor: "#489FB5" },
					headerTitle: "My Profile",
					headerTitleAlign: "center",
					headerStyle: { backgroundColor: "#489FB5" },
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontSize: 25,
						fontWeight: "bold",
					},

					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person" : "person-outline"}
							color={"white"}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

// how to style tabs:
// https://docs.expo.dev/router/advanced/tabs/
