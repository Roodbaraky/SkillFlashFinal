import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  Pressable,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { IsError, checkField } from "@/utils/utils";
import { checkUserExists } from "@/utils/api";
import { UserContext } from "@/contexts/UserContext";
import Loading from "./Loading";
import styles from "../styling/style";

interface LoginProps {
  setIsLoginOpen: (isLoginOpen: boolean) => void;
}

export default function Login({ setIsLoginOpen }: LoginProps) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isError, setIsError] = React.useState<IsError>({});
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    if (!passwordInput && !usernameInput) {
      setIsError({
        ...isError,
        password: "Please enter a password",
        username: "Please enter a valid username",
      });
      setIsLoading(false);
    } else if (!usernameInput) {
      setIsError({ ...isError, username: "Please enter a valid username" });
    } else if (!passwordInput) {
      setIsError({ ...isError, password: "Please enter a password" });
    } else {
      if (!isError.username && !isError.password) {
        setIsLoading(true);
        return checkUserExists(usernameInput, passwordInput)
          .then((data) => {
            return data;
          })
          .then((data) => {
            if (data.username) {
              setIsLoading(false);
              setUserDetails(data);
              router.replace("deck");
            } else {
              setIsLoading(false);
              setIsError({ ...isError, general: data.response.data.message });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView testID="login-container" style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={40}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.formContainer}>
              <Pressable
                onPress={() => {
                  setIsLoginOpen(false);
                }}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>Back</Text>
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
                <Text testID="usernameError" style={styles.error}>
                  {isError.username}
                </Text>
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
                <Text testID="passwordError" style={styles.error}>
                  {isError.password}
                </Text>
              ) : (
                <></>
              )}
              <Pressable
                testID="submit"
                onPress={handleSubmit}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Log in</Text>
              </Pressable>
              {isError.general?.length ? (
                <Text testID="generalError" style={styles.error}>
                  {isError.general}
                </Text>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}
