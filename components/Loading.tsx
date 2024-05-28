import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import LottieView from "lottie-react-native";

import { StyleSheet, Text, View } from "react-native";
export default function Error() {
	return (
		<SafeAreaView style={styles.animationContainer}>
			<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
				Please wait...
			</Text>
			<View style={styles.animationContainer}>
				<LottieView
					autoPlay
					speed={0.5}
					style={{
						width: 200,
						height: 200,
						marginTop: 50,
					}}
					source={require("../assets/loading1.json")}
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
