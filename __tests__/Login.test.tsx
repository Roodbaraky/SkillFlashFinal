import React from "react";
import {
  render,
  userEvent,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import Login from "@/app/Login";
import "@testing-library/react-native/extend-expect";
// import { renderRouter } from 'expo-router'
import { renderRouter } from "expo-router/testing-library";
import { router } from "expo-router";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

jest.mock("expo-router");

test("validates username of acceptable length - no error", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const usernameInput = screen.getByTestId("username");
  const user = userEvent.setup();
  await user.type(usernameInput, "hhh");
  const usernameValidation = screen.queryByTestId("usernameError");
  expect(usernameValidation).toBeNull();
});

test("validates username of unacceptable length - display error ", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const usernameInput = screen.getByTestId("username");
  const user = userEvent.setup();
  await user.type(usernameInput, "hh");
  const usernameValidation = screen.queryByTestId("usernameError");
  expect(usernameValidation).not.toBeNull();
  expect(usernameValidation).toHaveTextContent("Please enter a valid username");
});

test("validates password of acceptable structure - no error", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const passwordInput = screen.getByTestId("password");
  const user = userEvent.setup();
  await user.type(passwordInput, "Password!23");
  const passwordValidation = screen.queryByTestId("passwordError");
  expect(passwordValidation).toBeNull();
});

test("validates password of unacceptable structure - display error ", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const passwordInput = screen.getByTestId("password");
  const user = userEvent.setup();
  await user.type(passwordInput, "hh");
  const passwordValidation = screen.queryByTestId("passwordError");
  expect(passwordValidation).not.toBeNull();
  expect(passwordValidation).toHaveTextContent("Please enter a valid password");
});

test("should first", async () => {
  const mockSetState = jest.fn();
  const mockNavigate = jest.fn();
  const MockAuthLayout = jest.fn(() => <Login setIsLoginOpen={mockSetState} />);

  const history = createMemoryHistory({ initialEntries: ["/"] });

  router.replace = mockNavigate;
  // renderRouter(<Login setIsLoginOpen={mockSetState} />);

  //const submitBtn = screen.getByTestId("submit");
  const user = userEvent.setup();
  const usernameInput = screen.getByTestId("username");
  const passwordInput = screen.getByTestId("password");
  await user.type(usernameInput, "hhh");
  await user.type(passwordInput, "Password!23");
  console.log(usernameInput, passwordInput);
  fireEvent.press(screen.getByTestId("submit"));
  //give isError error
  //check for submitBtn press
  //expect should NOT navigate to home
  // expect(screen.getByText("Home")).toBeOnTheScreen();
  //^^^ fix me!
  // expect(mockNavigate).toHaveBeenCalled();
  expect(screen).toHaveRouterState({
    routes: [{ name: "home", path: "/home" }],
  });
});
