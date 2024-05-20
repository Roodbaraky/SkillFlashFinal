import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function Login({ setIsLoginOpen }) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const [isError, setIsError] = React.useState<IsError>({})

  interface IsError {
    username?: string,
    password?: string,
  }

  function checkUserExists(username: string, password: string) {

    const loginBody = { username, password }
    console.log(loginBody)
    //post request for axios
    //if successful goto next page
  }

  function handleSubmit() {
    if (!passwordInput && !usernameInput) {
      setIsError({ ...isError, password: 'Please enter a password', username: 'Please enter a valid username' })

    }
    else if (!usernameInput) {
      setIsError({ ...isError, username: 'Please enter a valid username' })

    }
    else if (!passwordInput) {
      setIsError({ ...isError, password: 'Please enter a password' })
    }
    else {
      checkUserExists(usernameInput, passwordInput)
    }
  }
  function checkField(e) {
    if (e.target.id === 'username' && !usernameInput) {
      console.log('error')
      const newError = { ...isError }
      newError.username = 'Please enter a valid username'
      setIsError(newError)
    }
    if (e.target.id === 'password' && !passwordInput) {
      console.log('error')
      const newError = { ...isError }
      newError.password = 'Please enter a password'
      setIsError(newError)
    }
  }

  return (
    <SafeAreaView>
      <Pressable onPress={() => { setIsLoginOpen(false) }}>X</Pressable>
      <Text style={styles.title}>Log in</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setUsernameInput(text)
          isError.username = ''
          console.log(usernameInput)
          setIsError(isError)
        }}
        onBlur={checkField}
        value={usernameInput}
        placeholder="username"
        id="username"
      />
      {isError.username && <Text>{isError.username}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setPasswordInput(text)
          isError.password = ''
          console.log(passwordInput)
          setIsError(isError)
        }}
        onBlur={checkField}
        value={passwordInput}
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        id='password'
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
