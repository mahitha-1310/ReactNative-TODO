import React from "react";
import renderer from "react-test-renderer";
import Header from "../components/Header";

jest.mock("../store/StateContext", () => ({
  useTask: () => ({
    fullName: "",
    logout: jest.fn(),
    tasks: [],
  }),
}));

it("find Element", () => {
  const testRenderer = renderer.create(<Header />);
  const testInstance = testRenderer.root;

  const button = testInstance.findByProps({ testID: "searchButton" });
  renderer.act(() => {
    button.props.onPress();
  });
  expect(button).toBeDefined();
});
