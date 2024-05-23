import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Index() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	const [isSignupOpen, setIsSignupOpen] = useState(false);

	const handlePress = (buttonType: string) => {
		if (buttonType === "login") {
			setIsLoginOpen(true);
			setIsSignupOpen(false);
		} else if (buttonType === "signup") {
			setIsSignupOpen(true);
			setIsLoginOpen(false);
		}
	};

	if (isLoginOpen) {
		return <Login setIsLoginOpen={setIsLoginOpen} />;
	}
	if (isSignupOpen) {
		return <Signup setIsSignupOpen={setIsSignupOpen} />;
	}

	return (
		<SafeAreaView style={styles.indexContainer}>
			<Text style={styles.title}>SkillFlash</Text>
			<Pressable onPress={() => handlePress("login")}>
				<Text style={styles.button}>Log in</Text>
			</Pressable>
			<Pressable onPress={() => handlePress("signup")}>
				<Text style={styles.button}>Sign up</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	indexContainer: {
		flex: 1,
		paddingTop: 58,
		alignSelf: "center",
	},
	title: {
		fontSize: 50,
		color: "black",
		marginTop: 100,
		marginBottom: 20,
		alignSelf: "center",
	},
	input: {
		height: 50,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: 250,
	},
	label: {
		color: "black",
		fontWeight: "bold",
		fontSize: 15,
		marginBottom: 5,
	},
	button: {
		alignSelf: "center",
		color: "black",
		fontWeight: "bold",
		fontSize: 20,
		borderStyle: "solid",
		borderWidth: 5,
		marginBottom: 10,
		padding: 10,
		borderRadius: 10,
	},
});
