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
						marginTop: 50,
					}}
					source={require("../assets/Error.json")}
				/>
			</View>
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
