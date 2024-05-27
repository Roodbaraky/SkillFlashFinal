import { StyleSheet } from "react-native";
const orange = "#FFA62B";
const blue = "#16697A";
const lightBlue = "#489FB5";

export default exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    height: 700,
    width: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: blue,
    marginBottom: 20,
    alignSelf: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    alignSelf: "center",
    backgroundColor: blue,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: 400,
  },

  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 30,
  },
  backButtonText: {
    textDecorationLine: "underline",
    textDecorationColor: blue,
    color: blue,
    fontSize: 18,
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
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
});
