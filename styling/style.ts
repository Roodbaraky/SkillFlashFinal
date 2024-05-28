import { Dimensions, StyleSheet } from "react-native";
const orange = "#FFA62B";
const blue = "#16697A";
const lightBlue = "#489FB5";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: blue,
    marginBottom: 20,
    alignSelf: "center",
  },
  mediumTitle: {
    fontSize: 35,
    color: blue,
    margin: 20,
    textAlign: "center",
  },
  smallTitle: {
    color: blue,
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  lessMargin: {
    margin: 1,
  },
  addTopMargin: {
    marginTop: 20,
  },
  fontSize12: {
    fontSize: 12,
  },
  alignLeft: {
    textAlign: "left",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "center",
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
    marginVertical: "auto",
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
    width: screenWidth * 0.75,
    alignSelf: "center",
    borderColor: blue,
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 18,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginVertical: 5,
    textAlign: "center",
  },
  //-----------------createNewDeck page------------------
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
    maxHeight: screenWidth * 0.7,
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: blue,
    borderRadius: 10,
    minHeight: 50,
    marginVertical: 10,
  },

  newDeckTagListContainer: {
    flex: 1,
    backgroundColor: lightBlue,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    marginTop: 20,
  },
  newDeckTagListContainerTitle: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    margin: 10,
  },
  newDeckCategoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  newDeckCategoryName: {
    marginVertical: 10,
    width: "100%",
    color: blue,
    backgroundColor: "white",
    fontSize: 22,
    fontWeight: 500,
    lineHeight: 25,
    textAlign: "center",
    textTransform: "capitalize",
  },
  tagButton: {
    padding: 6,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 10,
    backgroundColor: blue,
    justifyContent: "center",
    height: 30,
  },
  tagButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  tagButtonSelected: {
    backgroundColor: "white",
  },
  tagButtonTextSelected: {
    color: orange,
  },
  //------------------decks Page--------------------
  scrollViewContainer: {
    flex: 1,
    paddingVertical: 10,
    margin: 10,
  },
  deckTileFront: {
    backgroundColor: "#FFF",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    justifyContent: "center",
    width: screenWidth,
  },
  deckTileBack: {
    alignItems: "center",
    backgroundColor: orange,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 15,
    width: screenWidth - 20,
    marginVertical: 10,
  },
  backRightBtn: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: 75,
  },
  //---------------deck tile component----------------
  deckTileContainer: {
    flex: 1,
    padding: 10,
    height: 170,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: blue,
    backgroundColor: "white",
    shadowColor: lightBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,

    justifyContent: "center",
    width: screenWidth - 20,
    alignSelf: "center",
  },
  deckName: {
    fontSize: 25,
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    height: 120,
    marginBottom: 10,
    overflow: "hidden",
  },

  cardCount: {
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    bottom: 2,
    right: 10,
  },
  //deck/[id] page
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 30,
    height: "90%",
  },
  scrollStopper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  //--------------cardTile component-----------------

  cardTileContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 5,
    margin: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTileQ: {
    alignSelf: "center",
    paddingTop: 35,
    fontSize: 18,
    textAlign: "center",
    width: "90%",
    fontWeight: "bold",
    marginBottom: 5,
  },
  stats: {
    textAlign: "center",
    width: "100%",
    margin: 5,
  },
  cardTileTag: {
    position: "absolute",
    right: 5,
    padding: 6,
    height: 26,
  },
  //----------------play page----------------
  deckProgressLoader: {
    marginHorizontal: "auto",
    marginTop: screenHeight * 0.03,
  },
  noSwipeAnimation: {
    width: screenWidth * 0.3,
  },
  yesSwipeAnimation: {
    width: screenWidth * 0.3,
  },
  animationContainer: {
    position: "absolute",
    zIndex: 1000,
    width: screenWidth * 0.9,
    left: 0,
    right: 0,
    top: screenHeight * 0.0055,
    paddingTop: screenHeight * 0.0855,
    marginRight: "auto",
    marginLeft: "auto",
  },

  playBackground: {
    backgroundColor: blue,
  },
  playContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  //-----------flippable card---------------

  flippableDeckCard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: lightBlue,
    paddingVertical: screenHeight * 0.2,
    marginBottom: screenHeight * 0.2,

    width: screenWidth * 0.9,
    maxWidth: 500,
    marginHorizontal: "auto",
  },
  flippableDeckCardAlt: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightBlue,
    backgroundColor: "white",
    paddingVertical: screenHeight * 0.1,
    marginBottom: screenHeight * 0.2,
    width: screenWidth * 0.9,
    maxWidth: 500,
    marginHorizontal: "auto",
  },
  flippableCardText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    flex: 1,
    textAlignVertical: "center",
    color: "white",
    userSelect: "none",
  },
  flippableCardTextAlt: {
    fontSize: 24,
    textAlign: "center",
    margin: 10,
    flex: 1,
    color: blue,
    userSelect: "none",
  },
  flippableCardBtn: {
    backgroundColor: "#17697a",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    opacity: 0.5,
    transform: "scale(1.5)",
  },
  flippableCardBtnCl: {
    backgroundColor: "lightblue",
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    transform: "scale(1.25)",
  },

  flippableCardYBtn: {
    backgroundColor: "#17697a",
    opacity: 0.5,
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    transform: "scale(1.7)",
  },
  flippableCardYBtnCl: {
    backgroundColor: "lightgreen",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    transform: "scale(1.7)",
  },
  flippableCardNBtn: {
    backgroundColor: "#17697a",
    opacity: 0.5,
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    transform: "scale(1.7)",
  },
  flippableCardNBtnCl: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    transform: "scale(1.7)",
  },

  flippableCardBtnText: {
    fontSize: 20,
    color: "white",
    userSelect: "none",
  },
  flippableCardBtnTextCl: {
    fontSize: 20,
    color: "#17697a",
    userSelect: "none",
  },
  flippableCardBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    position: "absolute",
    bottom: 25,
  },
  //--------------profile page--------------
  profileContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  info: {
    fontSize: 22,
    marginVertical: 10,
  },
  detailsContainer: {
    width: screenWidth * 0.95,
    backgroundColor: "#d9eefe",
    padding: 20,
    borderRadius: 20,
  },

  inputInactive: {
    backgroundColor: "transparent",
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: blue,
    marginBottom: 30,
  },
  btn: {
    flex: 1,
  },
  btnActive: {
    backgroundColor: lightBlue,
  },
  btnText: {
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 18,
  },
  btnTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 10,
  },
  logoutButtonTxt: {
    color: "red",
    marginTop: 20,
    fontSize: 20,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});
