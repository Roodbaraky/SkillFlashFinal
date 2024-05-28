import React from "react";
import { UserContext } from "@/contexts/UserContext";
import { doesUserExist, updateUserInfo } from "@/utils/api";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	StyleSheet,
	Alert,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserInfo {
	username?: string;
	email?: string;
	password?: string;
}

interface Error {
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

export default function TabThreeScreen() {
	const { userDetails, setUserDetails } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(userDetails.username);
	const [email, setEmail] = useState(userDetails.email);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<Error>({});
	const [isValid, setIsValid] = useState(false);
	const [selection, setSelection] = useState(1);

	function handleLogout() {
		Alert.alert("Logout", "Are you sure?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Logout",
				onPress: () => {
					setUserDetails({});
					router.replace("/");
				},
			},
		]);
	}

	function handlePress() {
		setIsEditing(!isEditing);
	}

	async function nameValidation() {
		let error: Error = {};
		if (!name) {
			setName(userDetails.username);
		} else if (name.length < 3) {
			error.username = "username must be more than three characters";
		} else if (name !== userDetails.username && (await doesUserExist(name))) {
			error.username = "username already exists";
		}
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0);
	}

	async function emailValidation() {
		let error: Error = {};
		if (!email) setEmail(userDetails.email);
		else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			error.email = "Please enter a valid email";
		}
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0);
	}

	async function pwValidation() {
		let error: Error = {};
		if (
			!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/.test(
				password
			)
		) {
			error.password =
				"password must be 8+ characters with uppercase, lowercase, digit, and special character";
		}
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0);
	}

	async function confirmPwValidation() {
		let error: Error = {};
		if (!confirmPassword)
			error.confirmPassword = "please confirm your new password";
		else if (confirmPassword !== password)
			error.confirmPassword =
				"the passwords you entered do not match, please try again";
		setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		setIsValid(Object.keys(error).length === 0);
	}

	function handleSave() {
		if (selection === 1) {
			if (name === userDetails.username && email === userDetails.email) {
				setIsEditing(false);
				return;
			}
			if (userDetails.username && isValid) {
				let userInfo: UserInfo = {};
				if (name !== userDetails.username) userInfo.username = name;
				if (email !== userDetails.email) userInfo.email = email;
				updateUserInfo(userDetails.username, {
					username: userInfo.username,
					email: userInfo.email,
				});
				setIsEditing(false);
			} else {
				Alert.alert("Error", "Please correct the errors before saving.");
			}
		} else if (selection === 2) {
			if (userDetails.username && isValid) {
				updateUserInfo(userDetails.username, { password });
				setIsEditing(false);
				setPassword("");
			} else {
				Alert.alert("Error", "Please correct the errors before saving.");
			}
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.detailsContainer}>
				<View style={styles.btnGroup}>
					<TouchableOpacity
						style={[
							styles.btn,
							selection === 1 ? { backgroundColor: "lightblue" } : null,
						]}
						onPress={() => {
							setSelection(1);
							setErrors({});
							setIsEditing(false);
						}}
					>
						<Text
							style={[
								styles.btnText,
								selection === 1 ? { color: "white" } : null,
							]}
						>
							Your details
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							styles.btn,
							selection === 2 ? { backgroundColor: "lightblue" } : null,
						]}
						onPress={() => {
							setSelection(2);
							setErrors({});
							setIsEditing(false);
						}}
					>
						<Text
							style={[
								styles.btnText,
								selection === 2 ? { color: "white" } : null,
							]}
						>
							Change Password
						</Text>
					</TouchableOpacity>
				</View>

				{selection === 1 ? (
					<>
						<Text style={styles.label}>username: </Text>
						<TextInput
							style={[styles.input, !isEditing && styles.inputInactive]}
							value={name}
							onChangeText={(text) => {
								setName(text);
								setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
							}}
							onBlur={nameValidation}
							editable={isEditing}
							placeholder="name"
						/>
						{errors.username && (
							<Text style={styles.errorText}>{errors.username}</Text>
						)}

						<Text style={styles.label}>email: </Text>
						<TextInput
							style={[styles.input, !isEditing && styles.inputInactive]}
							value={email}
							onChangeText={(text) => {
								setEmail(text);
								setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
							}}
							onBlur={emailValidation}
							editable={isEditing}
							placeholder="email"
							keyboardType="email-address"
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}

						<Pressable onPress={isEditing ? handleSave : handlePress}>
							<Text style={styles.editButton}>
								{isEditing ? "save" : "edit"}
							</Text>
						</Pressable>
					</>
				) : (
					<SafeAreaView>
						<Text style={styles.label}>New Password: </Text>
						<TextInput
							style={styles.input}
							value={password}
							onChangeText={(text) => {
								setPassword(text);
								setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
							}}
							onBlur={pwValidation}
							placeholder="New Password"
							secureTextEntry
						/>
						{errors.password && (
							<Text style={styles.errorText}>{errors.password}</Text>
						)}

						<Text style={styles.label}>Confirm Password</Text>
						<TextInput
							style={styles.input}
							value={confirmPassword}
							onChangeText={(text) => {
								setConfirmPassword(text);
								setErrors((prevErrors) => ({
									...prevErrors,
									confirmPassword: "",
								}));
							}}
							onBlur={confirmPwValidation}
							placeholder="Re-enter password"
							secureTextEntry
						/>
						{errors.confirmPassword && (
							<Text style={styles.errorText}>{errors.confirmPassword}</Text>
						)}

						<Pressable onPress={handleSave}>
							<Text style={styles.editButton}>submit</Text>
						</Pressable>
					</SafeAreaView>
				)}
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
		borderRadius: 20,
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
	},
	btnGroup: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#6B7280",
	},
	btn: {
		flex: 1,
		borderRightWidth: 0.25,
		borderLeftWidth: 0.25,
		borderColor: "#6B7280",
	},
	btnText: {
		textAlign: "center",
		paddingVertical: 16,
		fontSize: 14,
	},
});
