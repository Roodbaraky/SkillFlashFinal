import React from "react";
import {
  render,
  userEvent,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import Login from "@/components/Login";
import "@testing-library/react-native/extend-expect";

import { renderRouter } from "expo-router/testing-library";
import { router, useNavigation, useRouter } from "expo-router";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { StackRouter } from "@react-navigation/native";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

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

// test("navigates to home if login successful", async () => {
//   const mockSetState = jest.fn();
//   const MockComponent = jest.fn(() => <Login setIsLoginOpen={mockSetState} />);

//   renderRouter(
//     {
//       i: MockComponent,
//       index: MockComponent,
//       home: MockComponent,
//     },
//     {
//       initialUrl: "/",
//     }
//   );

//   const usernameInput = screen.getByTestId("username");
//   const passwordInput = screen.getByTestId("password");

//   fireEvent.changeText(usernameInput, "finally?");
//   fireEvent.changeText(passwordInput, "Password1!");
//   fireEvent.press(screen.getByTestId("submit"));
//   expect(screen).toHavePathname("/home");
// });
