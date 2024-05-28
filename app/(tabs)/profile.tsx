import { UserContext } from "@/contexts/UserContext";
import { doesUserExist, updateUserInfo } from "@/utils/api";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

interface UserInfo {
	username?: string;
	email?: string;
	password?: string;
}

export default function TabThreeScreen() {
	const { userDetails, setUserDetails } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(userDetails.username);
	const [email, setEmail] = useState(userDetails.email);
	const [errors, setErrors] = useState<UserInfo>({})
	const [isValid, setIsValid] = useState(false)

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

	async function nameValidation() {
		let error:UserInfo = {}
		if (!name) {
			error.username = "please enter a valid username"
		} else if (name.length < 3) {
			error.username = "username must be more than three characters"
		} else if (name !== userDetails.username && await doesUserExist(name)) {
			error.username = "username already exists"
		}
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0)
	}

	async function emailValidation() {
		let error:UserInfo = {}
		if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) { 
			error.email = "Please enter a valid email" 
		}
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0)
	}
	
	

	function handleSave() {
		if (userDetails.username && isValid) {
			let userInfo:UserInfo = {}
			if (name !== userDetails.username) userInfo.username = name
			if (email !== userDetails.email) userInfo.email = email
			updateUserInfo(userDetails.username, {username: userInfo.username, email: userInfo.email})
			setIsEditing(false);
		} else {
			Alert.alert('Error', 'Please correct the errors before saving.')
		}
	}
  
	return (
		<View style={styles.container}>
			<View style={styles.detailsContainer}>
				<Text style={styles.headerText}>your details</Text>
				
					<Text style={styles.label}>username: </Text>
					<TextInput
						style={[styles.input, !isEditing && styles.inputInactive]}
						value={name}
						onChangeText={(text)=>{
							setName(text)
							setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
						}}
						onBlur={nameValidation}
						editable={isEditing}
						placeholder="name"
					/>
					{errors.username && <Text style={styles.errorText}>{errors.username}</Text>}					

					<Text style={styles.label}>email: </Text>
					<TextInput
						style={[styles.input, !isEditing && styles.inputInactive]}
						value={email}
						onChangeText={(text)=>{
							setEmail(text)
							setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
						}}
						onBlur={emailValidation}
						editable={isEditing}
						placeholder="email"
						keyboardType="email-address"
					/>
					{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

				<Pressable onPress={isEditing ? handleSave : handlePress}>
				<Text style={styles.editButton}>{isEditing ? "save" : "edit"}</Text>
				</Pressable>
			</View>
			<Pressable style={styles.logoutButton} onPress={handleLogout}>
				<Text>log out</Text>
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
	errorText: {
		color: "red",
    	alignSelf: "flex-start",
	}
  });