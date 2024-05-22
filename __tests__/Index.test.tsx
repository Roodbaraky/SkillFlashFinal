import Index from "../app/index";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import "@testing-library/react-native/extend-expect";

test("Index it has two buttons", async () => {
  render(<Index />);
  expect(screen.getByText("Sign up")).toBeOnTheScreen();
  expect(screen.getByText("Log in")).toBeOnTheScreen();
});

test("opens login component", async () => {
  render(<Index />);
  fireEvent.press(screen.getByText("Log in"));
  expect(screen.getByTestId("login-container")).toBeOnTheScreen();
});

test("opens sigup component", async () => {
  render(<Index />);
  fireEvent.press(screen.getByText("Sign up"));
  expect(screen.getByTestId("signup-container")).toBeOnTheScreen();
});
