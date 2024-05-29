import { UserContext } from "@/contexts/UserContext";
import { doesUserExist, updateUserInfo } from "@/utils/api";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import styles from "@/styling/style";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
	StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
	const [showPw, setShowPw] = useState(false); 
	const [showConfirmPw, setShowConfirmPw] = useState(false); 
  const [errors, setErrors] = useState<Error>({});
  const [selection, setSelection] = useState(1);

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to log out?", [
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

	function toggleShowPw() { 
		setShowPw(!showPw); 
	};

	function toggleShowConfirmPw() { 
		setShowConfirmPw(!showConfirmPw); 
	};

  async function nameValidation() {
    let error: Error = {};
    if (!name) {
      setName(userDetails.username);
    } else if (name.length < 3) {
      error.username = "Username must contain more than three characters";
    } else if (name !== userDetails.username && (await doesUserExist(name))) {
      error.username = "Username already exists";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		return error
  }

  async function emailValidation() {
    let error: Error = {};
    if (!email) setEmail(userDetails.email);
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      error.email = "Please enter a valid email";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		return error
  }

  async function pwValidation() {
    let error: Error = {};
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/.test(
        password
      )
    ) {
      error.password =
        "Password must be 8+ characters and contain at least one of the following: uppercase, lowercase, number, and special character(@$!%*?&)";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		return error
  }

  async function confirmPwValidation() {
    let error: Error = {};
    if (!confirmPassword)
      error.confirmPassword = "Please confirm your new password";
    else if (confirmPassword !== password)
      error.confirmPassword =
        "The passwords you entered do not match, please try again";
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
		return error
  }

  async function handleSave() {
    if (selection === 1) {
			const error = {...await nameValidation(), ...await emailValidation()}
      if (name === userDetails.username && email === userDetails.email) {
        setIsEditing(false);
        return;
      }
      if (userDetails.username && Object.keys(error).length === 0) {
        let userInfo: UserInfo = {};
        if (name !== userDetails.username) userInfo.username = name;
        if (email !== userDetails.email) userInfo.email = email;
        try {
          const newDetails = await updateUserInfo(
            userDetails.username,
            userInfo
          );

          setUserDetails(newDetails);
          alert("Your details have been updated!");
          setIsEditing(false);
        } catch (err) {
          console.log(err);
					setName(userDetails.username)
					setEmail(userDetails.email)
          alert(
            "There has been a problem with your request. Please try again later"
          );
          setEmail(userDetails.email);
          setName(userDetails.username);
        }
      } else {
        alert(
          "Please check the information you've entered is correct before saving."
        );
      }
    } else if (selection === 2) {
			const error = {...await pwValidation(), ...await confirmPwValidation()}
      if (userDetails.username && Object.keys(error).length === 0) {
        try {
          await updateUserInfo(userDetails.username, {
            password,
          });

          setIsEditing(false);
          setPassword("");

          setConfirmPassword("");
          alert("Your password has been changed!");

					

        } catch (err) {
          console.log(err);
          alert(
            "There has been a problem with your request. Please try again later"
          );
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        alert(
          "Please check the information you've entered is correct before saving."
        );
      }
    }
  }

  return (
    <SafeAreaView style={styles.profileContainer}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={40}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={[styles.mediumTitle, styles.info]}>
            You can update your details by selecting an option below and editing
            your information.
          </Text>
          <Text style={[styles.mediumTitle, styles.info]}>
            Make sure you save any changes :)
          </Text>
          <View style={styles.detailsContainer}>
            <View style={styles.btnGroup}>
              <Pressable
                style={[styles.btn, selection === 1 ? styles.btnActive : null]}
                onPress={() => {
                  setSelection(1);
                  setErrors({});
                  setIsEditing(false);
                }}
              >
                <Text
                  style={[
                    styles.btnText,
                    selection === 1 ? styles.btnTextActive : null,
                  ]}
                >
                  Your Details
                </Text>
              </Pressable>

              <Pressable
                style={[styles.btn, selection === 2 ? styles.btnActive : null]}
                onPress={() => {
                  setSelection(2);
                  setErrors({});
                  setIsEditing(true);
                }}
              >
                <Text
                  style={[
                    styles.btnText,
                    selection === 2 ? styles.btnTextActive : null,
                  ]}
                >
                  Change Password
                </Text>
              </Pressable>
            </View>

            {selection === 1 ? (
              <>
                <Text style={styles.label}>Username: </Text>
                <TextInput
                  style={[styles.input, !isEditing && styles.inputInactive]}
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      username: "",
                    }));
                  }}
                  onBlur={nameValidation}
                  editable={isEditing}
                  placeholder="name"
                />
                {errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <Text style={styles.label}>Email: </Text>
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

                <Pressable
                  style={styles.button}
                  onPress={isEditing ? handleSave : handlePress}
                >
                  <Text style={styles.buttonText}>
                    {isEditing ? "Save" : "Edit"}
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.label}>New Password: </Text>
								<View style={pwStyles.PasswordContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      password: "",
                    }));
                  }}
                  onBlur={pwValidation}
                  placeholder="New password"
                  secureTextEntry={!showPw}
                  textContentType="password"
                />
								<MaterialCommunityIcons
                    name={showPw ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    onPress={toggleShowPw} 
                />
								</View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <Text style={styles.label}>Confirm Password: </Text>
								<View style={pwStyles.PasswordContainer}>
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
                  secureTextEntry={!showConfirmPw}
                  textContentType="password"
                />
								<MaterialCommunityIcons
                    name={showConfirmPw ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    onPress={toggleShowConfirmPw} 
                />
								</View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <Pressable onPress={handleSave} style={styles.button}>
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
              </>
            )}
          </View>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonTxt}>Log out</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const pwStyles = StyleSheet.create({
	PasswordContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center',  
		borderRadius: 8, 
	}
})