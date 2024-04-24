import React from "react";
import App from "../App";
import renderer from "react-test-renderer";

test("State Provider snapshot", () => {
  const snap = renderer.create(<App />).toJSON();
  expect(snap).toMatchSnapshot();
});
