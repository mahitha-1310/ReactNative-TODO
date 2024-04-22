import React from "react";
import SnapshotTest from "../TestFiles/SnapshotTest";
import renderer from "react-test-renderer";

test("Test Snapshot", () => {
  const snap = renderer.create(<SnapshotTest />).toJSON();
  expect(snap).toMatchSnapshot();
});

// import React from "react";
// import App from "../App";
// import { StateProvider } from "../store/StateContext";
// import renderer from "react-test-renderer";

// test("State Provider snapshot", () => {
//   const snap = renderer.create(<StateProvider />).toJSON;
//   expect(snap).toMatchSnapshot();
// });
