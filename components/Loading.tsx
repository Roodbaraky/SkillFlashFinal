import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

import { StyleSheet, Text, View } from "react-native";
export default function Error() {
	const animation = useRef(null);

	return (
		<SafeAreaView style={styles.animationContainer}>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					marginBottom: 20,
					color: "#489FB5",
				}}
			>
				Please wait...
			</Text>
			<View style={styles.animationContainer}>
				<LottieView
					autoPlay
					ref={animation}
					style={{
						width: 300,
						height: 300,
						marginTop: 50,
					}}
					source={require("../assets/loading.json")}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	animationContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		padding: 10,
	},
	buttonContainer: {
		paddingTop: 20,
	},
});
