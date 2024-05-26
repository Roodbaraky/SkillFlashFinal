import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { getDecksByUsername } from "../../utils/api";
import { HomeDeck } from "../../utils/utils";
import DeckTile from "../../components/DeckTile";
import { DecksContext } from "../../contexts/DecksContext";
import { SwipeListView } from "react-native-swipe-list-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
export default function TabOneScreen() {
	const { userDetails } = useContext(UserContext);
	const { decks, setDecks } = useContext(DecksContext);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		getDecksByUsername(userDetails.username || "")
			.then((data) => {
				const decksDisplay: HomeDeck[] = [...data] || [];
				return decksDisplay;
			})
			.then((decksDisplay) => {
				setIsLoading(false);
				setDecks(decksDisplay);
			});
	}, [userDetails.username]);

	const deleteRow = (rowKey: string) => {
		const newData = decks.filter((item) => item._id !== rowKey);
		setDecks(newData);
	};

	return (
		<SafeAreaView testID="home-container" style={styles.container}>
			<View>
				<Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
					Hi {userDetails.username} !
				</Text>
				<Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>
					Welcome to SkillFlash
				</Text>
			</View>
			<View style={styles.scrollViewContent}>
				<Text>Your decks</Text>
				<SwipeListView
					disableRightSwipe
					data={decks}
					keyExtractor={(item) => item._id}
					renderItem={(data, rowMap) => (
						<View style={styles.rowFront}>
							<DeckTile deck={data.item} />
						</View>
					)}
					renderHiddenItem={(data, rowMap) => (
						<View style={styles.rowBack}>
							<TouchableOpacity
								style={styles.backRightBtn}
								onPress={() =>
									Alert.alert("Delete deck", "Are you sure?", [
										{ text: "Cancel", style: "cancel" },
										{ text: "OK", onPress: () => deleteRow(data.item._id) },
									])
								}
							>
								<Feather name="trash-2" size={35} color="red" />
							</TouchableOpacity>
						</View>
					)}
					leftOpenValue={0}
					rightOpenValue={-75}
				/>
				{/* <FlatList
					data={decks}
					renderItem={({ item }) => <DeckTile deck={item} />}
				/> */}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingVertical: 10,
		height: "80%",
		marginLeft: 10,
		marginTop: 10,
	},
	rowFront: {
		backgroundColor: "#FFF",
		borderBottomColor: "#CCC",
		borderBottomWidth: 1,
		justifyContent: "center",
		height: 140,
		width: screenWidth,
	},
	rowBack: {
		alignItems: "center",
		backgroundColor: "#DDD",
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingRight: 15,
		width: screenWidth,
		marginVertical: 10,
		borderRadius: 10,
	},
	backRightBtn: {
		alignItems: "flex-end",
		justifyContent: "flex-end",
		width: 75,
	},
});
