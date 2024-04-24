import React from "react";
import SearchScreenModal from "../modals/SearchScreenModal";
import renderer from "react-test-renderer";

jest.mock("../store/StateContext", () => ({
  useTask: () => ({
    tasks: [],
    deleteTask: jest.fn(),
    editTask: jest.fn(),
    toggleFavorite: jest.fn(),
    toggleComplete: jest.fn(),
  }),
}));

it("find Element", () => {
  const testRenderer = renderer.create(<SearchScreenModal />);
  const testInstance = testRenderer.root;

  const touchableOpacity = testInstance.findByProps({ testID: "search" });
  expect(touchableOpacity).toBeDefined();
});
