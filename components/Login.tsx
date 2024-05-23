import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { IsError, checkField } from "@/utils/utils";
import { checkUserExists } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";

interface LoginProps {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
}

export default function Login({ setIsLoginOpen }: LoginProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isError, setIsError] = React.useState<IsError>({});
  const { userDetails, setUserDetails } = useContext(UserContext);

  function handleSubmit() {
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
      if (!isError.username && !isError.password) {
        return checkUserExists(usernameInput, passwordInput)
          .then((data) => {
            return data;
          })
          .then((data) => {
            if (data.username) {
              setUserDetails(data);
              router.replace("/userPage");
            } else {
              setIsError({ ...isError, general: data.response.data.message });
              setTimeout(() => {
                alert(data.response.data.message);
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <SafeAreaView testID="login-container" style={styles.logInContainer}>
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
          setIsError({ ...isError, username: "", general: "" });
        }}
        onBlur={() => {
          checkField("username", setIsError, usernameInput);
        }}
        value={usernameInput}
        placeholder="username"
        id="username"
        testID="username"
      />
      {isError.username?.length ? (
        <Text testID="usernameError">{isError.username}</Text>
      ) : (
        <></>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPasswordInput(text);

          setIsError({ ...isError, password: "", general: "" });
        }}
        onBlur={() => {
          checkField("password", setIsError, passwordInput);
        }}
        value={passwordInput}
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        id="password"
        testID="password"
      />
      {isError.password?.length ? (
        <Text testID="passwordError">{isError.password}</Text>
      ) : (
        <></>
      )}
      <Pressable testID="submit" onPress={handleSubmit}>
        <Text style={styles.button}>Log in</Text>
      </Pressable>
      {isError.general?.length ? (
        <Text testID="generalError">{isError.general}</Text>
      ) : (
        <></>
      )}
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