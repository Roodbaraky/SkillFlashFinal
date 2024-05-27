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
    height: "auto",
    width: "auto",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: blue,
    marginBottom: 20,
    alignSelf: "center",
  },
  mediumTitle: {
    fontSize: 30,
    color: blue,
    margin: 20,
    textAlign: "center",
  },
  smallTitle: {
    color: blue,
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    borderTopColor: orange,
    borderTopWidth: 2,
    paddingTop: 10,
    textAlign: "center",
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
    fontSize: 20,
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
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
    alignSelf: "center",
    borderColor: blue,
    borderRadius: 10,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  error: {
    color: "red",
    marginVertical: 5,
    textAlign: "center",
  },
  newDeckButton: {
    margin: 0,
  },
  newDeckScrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  newDeckTagSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: 200,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 10,
    minHeight: 50,
  },

  newDeckTagListContainer: {
    flex: 1,
    backgroundColor: lightBlue,
    padding: 5,
    marginHorizontal: 5,
  },
  newDeckCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  newDeckCategoryTitle: {
    margin: 10,
    marginHorizontal: "auto",
    minWidth: 320,
    color: blue,
    backgroundColor: "white",
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 25,
    textAlign: "center",
  },
  tagButton: {
    padding: 6,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: blue,
    justifyContent: "center",
  },
  tagButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagButtonSelected: {
    backgroundColor: "white",
  },
  tagButtonTextSelected: {
    color: orange,
  },
});
