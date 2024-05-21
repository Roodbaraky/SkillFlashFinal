import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { checkField } from "@/utils/utils";
import { IsError } from "@/utils/utils";
import { checkUserExists } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";

interface LoginProps {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
}

export default function Login({ setIsLoginOpen }: LoginProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isError, setIsError] = React.useState<IsError>({});
  const [, setUserDetails] = useContext(UserContext);

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
      if (!isError.username && !isError.password) {
        try {
          const userDetails = await checkUserExists(
            usernameInput,
            passwordInput
          );
          setUserDetails(userDetails);
        } catch (err) {
          // console.log(err); //error component => username / email already exists
        } finally {
          router.replace("/home");
        }
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
          setIsError({ ...isError, username: "" });
        }}
        onBlur={() => {
          checkField('username', setIsError, usernameInput);
        }}
        value={usernameInput}
        placeholder="username"
        id="username"
        testID="username"
      />
      {isError.username?.length ? <Text testID="usernameError">{isError.username}</Text> : <></>}

      {/* ^^^ This was the annoying console error, while passing an empty string IS falsy, it's also rendering text within a view, outside of a <Text></Text>
      Be careful of this when doing conditional rendering x 
      
      N.B. Used to be: "isError.*/}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPasswordInput(text);

          setIsError({ ...isError, password: "" });
        }}
        onBlur={() => {
          checkField('password', setIsError, passwordInput);
        }}
        value={passwordInput}
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        id="password"
        testID="password"
      />
      {isError.password?.length ? <Text testID="passwordError">{isError.password}</Text> : <></>}
      <Pressable testID="submit" onPress={handleSubmit}>
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
