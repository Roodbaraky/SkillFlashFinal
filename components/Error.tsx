import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
export default function Error() {
	const animation = useRef(null);
	const router = useRouter();
	return (
		<SafeAreaView style={styles.animationContainer}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					color: "#489FB5",
					marginTop: 50,
				}}
			>
				Oops ... Something went wrong!
			</Text>

			<View style={styles.animationContainer}>
				<LottieView
					autoPlay
					ref={animation}
					style={{
						width: 200,
						height: 200,
						marginTop: 30,
					}}
					source={require("../assets/Error.json")}
				/>
			</View>
			<Pressable
				onPress={() => {
					router.back();
				}}
			>
				<Text
					style={{
						fontSize: 24,
						fontWeight: "bold",
						color: "#489FB5",
						marginTop: 10,
					}}
				>
					Go back
				</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
