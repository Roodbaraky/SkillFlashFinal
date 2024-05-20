import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";
import { IsError, checkField } from "@/utils/utils";
import { router } from "expo-router";

import { createUser } from "@/utils/api";
interface SignUpProps {
  setIsSignupOpen: (isLoginOpen: boolean) => void;
  setUserDetails: (userDetails: object | void) => void;
}

export default function Signup({
  setIsSignupOpen,
  setUserDetails,
}: SignUpProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");

  const [isError, setIsError] = React.useState<IsError>({});

  async function handleSubmit() {
    if (!passwordInput && !usernameInput && !emailInput) {
      setIsError({
        ...isError,
        password: "Please enter a password",
        username: "Please enter a valid username",
        email: "Please enter a valid email",
      });
    } else if (!usernameInput) {
      setIsError({ ...isError, username: "Please enter a valid username" });
    } else if (!passwordInput) {
      setIsError({ ...isError, password: "Please enter a password" });
    } else if (!emailInput) {
      setIsError({ ...isError, email: "Please enter a valid email" });
    } else {
      try {
        const userDetails = await createUser(
          usernameInput,
          passwordInput,
          emailInput
        );
        setUserDetails(userDetails);
      } catch (err) {
        console.log(err); //error component
      } finally {
        router.replace("/home");
      }
    }
  }

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setIsSignupOpen(false);
        }}
      >
        <Text>X</Text>
      </Pressable>
      <Text style={styles.title}>Sign Up page</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUsernameInput(text);
          setIsError({
            ...isError,
            username: "",
          });
        }}
        onBlur={(e) => {
          checkField(e, setIsError, usernameInput);
        }}
        value={usernameInput}
        placeholder="username"
        id="username"
      />
      {isError.username && <Text>{isError.username}</Text>}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setEmailInput(text);

          setIsError({ ...isError, email: "" });
        }}
        value={emailInput}
        placeholder="email"
        textContentType="emailAddress"
        onBlur={(e) => {
          checkField(e, setIsError, emailInput);
        }}
        id="email"
      />
      {isError.email && <Text>{isError.email}</Text>}
      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPasswordInput(text);

          setIsError({ ...isError, password: "" });
        }}
        onBlur={(e) => {
          checkField(e, setIsError, passwordInput);
        }}
        value={passwordInput}
        placeholder="password"
        secureTextEntry={true}
        textContentType="password"
        id="password"
      />
      {isError.password && <Text>{isError.password}</Text>}
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setConfirmPasswordInput(text);

          setIsError({ ...isError, confirmPassword: "" });
        }}
        onBlur={(e) => {
          checkField(e, setIsError, confirmPasswordInput);
          if (confirmPasswordInput && passwordInput !== confirmPasswordInput)
            setIsError({
              ...isError,
              confirmPassword: "passwords do not match",
            });
        }}
        value={confirmPasswordInput}
        placeholder="confirm your password"
        secureTextEntry={true}
        textContentType="password"
        id="confirmPassword"
      />
      {isError.confirmPassword && <Text>{isError.confirmPassword}</Text>}

      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logInContainer: {
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
  },
});
