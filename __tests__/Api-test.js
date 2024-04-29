import { Users } from "../utils/Users";

it("api test case", async function () {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        json: function () {
          return { Id: 1 };
        },
      });
    });
    return p;
  });
  const response = await Users.all();
  expect(response.Id).toBe(1);
});
