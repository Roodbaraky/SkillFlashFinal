import Home from "../app/index";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import "@testing-library/react-native/extend-expect";
import renderer from "react-test-renderer";
import { renderRouter, screen } from "expo-router/testing-library";
import UserPage from "@/app/(tabs)/userPage";

test("navigates to deck/[id]", async () => {
  const MockComponent = jest.fn(() => <UserPage />);

  renderRouter(
    {
      index: MockComponent,
      userPage: MockComponent,
      deck: MockComponent,
    },
    {
      initialUrl: "/userPage",
    }
  );
});
