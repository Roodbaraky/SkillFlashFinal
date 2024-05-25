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
					headerShown: true,
					headerTitle: "Home",
					headerTitleAlign: "center",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="createNew"
				options={{
					headerTitle: "Create New Deck",
					headerTitleAlign: "center",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle-outline" : "add-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					headerTitle: "My Profile",
					headerTitleAlign: "center",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person-outline" : "person-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

// how to style tabs:
// https://docs.expo.dev/router/advanced/tabs/
