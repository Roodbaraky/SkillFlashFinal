import { UserContext } from "@/contexts/UserContext";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

export default function TabThreeScreen() {
	const { userDetails, setUserDetails } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	// unfinished 👇
	// const [usernameEditing, setUsernameEditing] = useState(false);
	// const [emailEditing, setEmailEditing] = useState(false);
	const [name, setName] = useState(userDetails.username);
	const [email, setEmail] = useState(userDetails.email);

	function handleLogout() {
		Alert.alert('Logout', 'Are you sure?', [
			{
			  text: 'Cancel',
			  style: 'cancel',
			},
			{text: 'Logout', onPress: () => {
				setUserDetails({})
				router.replace('/')
			}},
		]);
	}
  
	function handlePress() {
		setIsEditing(!isEditing);
	}
  
	function handleSave() {
		// patch here
		setIsEditing(false);
	}
  
	return (
		<View style={styles.container}>
			<View style={styles.detailsContainer}>
				<Text style={styles.headerText}>your details</Text>
				
				{/* <View style={ styles.Row }> */}
					<Text style={styles.label}>username: </Text>
					<TextInput
						style={[styles.input, !isEditing && styles.inputInactive]}
						value={name}
						onChangeText={setName}
						editable={isEditing}
						placeholder="name"
					/>
				{/* </View> */}

				{/* <View style={ styles.inputRow }> */}
					<Text style={styles.label}>email: </Text>
					<TextInput
						style={[styles.input, !isEditing && styles.inputInactive]}
						value={email}
						onChangeText={setEmail}
						editable={isEditing}
						placeholder="email"
						keyboardType="email-address"
					/>
				{/* </View> */}

				<Pressable onPress={isEditing ? handleSave : handlePress}>
				<Text style={styles.editButton}>{isEditing ? "save" : "edit"}</Text>
				</Pressable>
			</View>
			<Pressable style={styles.logoutButton} onPress={handleLogout}>
				<Text style={styles.logoutText}>log out</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 50,
	},
	detailsContainer: {
		width: "80%",
		backgroundColor: "#d9eefe",
		padding: 20,
		alignItems: "center",
		borderRadius: 20
	},
	headerText: {
		fontSize: 18,
		marginBottom: 20,
	},
	label: {
		alignSelf: "flex-start",
	},
	input: {
		width: "100%",
		padding: 10,
		marginVertical: 10,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "lightgrey",
	},
	inputInactive: {
		borderWidth: 0,
		backgroundColor: "transparent",
	},
	// inputRow: {
	// 	flexDirection: 'row',
	// 	alignItems: 'center',
	// 	marginBottom: 8,
	// 	width: "100%"
	// },
	logoutButton: {
		backgroundColor: "lightblue",
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	},
	editButton: {
		color: "blue",
		textDecorationLine: "underline",
		marginTop: 20,
	},
  });