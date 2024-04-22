import React from "react";
import renderer from "react-test-renderer";
import FunctionTest from "../TestFiles/FunctionTest";

test("Test Function", () => {
  const data = renderer.create(<FunctionTest />).getInstance();
  expect(data.change(7)).toEqual(14);
});
