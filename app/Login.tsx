import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { checkField } from "@/utils/utils";
import { IsError } from "@/utils/utils";
import { checkUserExists } from "@/utils/api";
interface LoginProps {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
  setUserDetails: (userDetails: object | void) => void;
}

export default function Login({ setIsLoginOpen, setUserDetails }: LoginProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isError, setIsError] = React.useState<IsError>({});

  async function handleSubmit() {
    if (!passwordInput && !usernameInput) {
      setIsError({
        ...isError,
        password: "Please enter a password",
        username: "Please enter a valid username",
      });
    } else if (!usernameInput) {
      setIsError({ ...isError, username: "Please enter a valid username" });
    } else if (!passwordInput) {
      setIsError({ ...isError, password: "Please enter a password" });
    } else {
      try {
        const userDetails = await checkUserExists(usernameInput, passwordInput);
        setUserDetails(userDetails);
      } catch (err) {
        console.log(err);
      } finally {
        router.replace("/home");
      }
    }
  }

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          setIsLoginOpen(false);
        }}
      >
        <Text>X</Text>
      </Pressable>
      <Text style={styles.title}>Log in</Text>
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
        textContentType="password"
        secureTextEntry={true}
        id="password"
      />
      {isError.password && <Text>{isError.password}</Text>}
      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>Log in</Text>
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
