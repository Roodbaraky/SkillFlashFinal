import Home from "../app/index";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import "@testing-library/react-native/extend-expect";
import renderer from "react-test-renderer";

test("Index it has two buttons", async () => {
  render(<Home />);
  expect(screen.getByText("Sign up")).toBeOnTheScreen();
  expect(screen.getByText("Log in")).toBeOnTheScreen();
});

test("opens login component", async () => {
  render(<Home />);
  fireEvent.press(screen.getByText("Log in"));
  expect(screen.getByTestId("login-container")).toBeOnTheScreen();
});

test("opens sigup component", async () => {
  render(<Home />);
  fireEvent.press(screen.getByText("Sign up"));
  expect(screen.getByTestId("signup-container")).toBeOnTheScreen();
});

test("has 3 children??", () => {
  render(<Home />);
  const tree = renderer.create(<Home />).toJSON();
  //create is deprecated?? dont know what else to use
  expect(tree.children.length).toBe(3);
});

//run after styling?Mock component use and test again to compare snapshots:
test("renders correctly", () => {
  render(<Home />);
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
