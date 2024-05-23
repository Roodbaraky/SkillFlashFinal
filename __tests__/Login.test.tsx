import React from "react";

import {
  render,
  userEvent,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import Login from "@/components/Login";
import "@testing-library/react-native/extend-expect";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

test("accepts username of valid length", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const usernameInput = screen.getByTestId("username");
  const user = userEvent.setup();
  await user.type(usernameInput, "hhh");
  const usernameValidation = screen.queryByTestId("usernameError");
  expect(usernameValidation).toBeNull();
});

test("displays error for a username of invalid length", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const usernameInput = screen.getByTestId("username");
  const user = userEvent.setup();
  await user.type(usernameInput, "hh");
  const usernameValidation = screen.queryByTestId("usernameError");
  expect(usernameValidation).not.toBeNull();
  expect(usernameValidation).toHaveTextContent("Please enter a valid username");
});
test("displays error for a username that does not exist in the database", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const usernameInput = screen.getByTestId("username");
  const passwordInput = screen.getByTestId("password");
  const user = userEvent.setup();
  await user.type(usernameInput, "aaanna");
  await user.type(passwordInput, "Password!23");
  await user.press(screen.getByTestId("submit"));
  const generalValidation = screen.queryByTestId("generalError");
  console.log(generalValidation);

  expect(generalValidation).toHaveTextContent("username does not exist");
  expect(generalValidation).not.toBeNull();
});

test("accepts password of valid type", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const passwordInput = screen.getByTestId("password");
  const user = userEvent.setup();
  await user.type(passwordInput, "Password!23");
  const passwordValidation = screen.queryByTestId("passwordError");
  expect(passwordValidation).toBeNull();
});

test("displays error for a password of invalid type ", async () => {
  const mockSetState = jest.fn();
  render(<Login setIsLoginOpen={mockSetState} />);
  const passwordInput = screen.getByTestId("password");
  const user = userEvent.setup();
  await user.type(passwordInput, "hh");
  const passwordValidation = screen.queryByTestId("passwordError");
  expect(passwordValidation).not.toBeNull();
  expect(passwordValidation).toHaveTextContent("Please enter a valid password");
});

test("navigates to home if login successful", async () => {
  const mockSetState = jest.fn();

  render(<Login setIsLoginOpen={mockSetState} />);

  const usernameInput = screen.getByTestId("username");
  const passwordInput = screen.getByTestId("password");

  fireEvent.changeText(usernameInput, "kooooo");
  fireEvent.changeText(passwordInput, "Password!23");

  fireEvent.press(screen.getByTestId("submit"));
  screen.getByText("Welcome to SkillFlash");
});
