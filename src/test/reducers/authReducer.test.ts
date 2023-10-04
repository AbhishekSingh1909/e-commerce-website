import { createStore } from "../../redux/store";
import { userAccess_token } from "../../redux/userAuthentication/authReducer";
import { authenticateUserAsync } from "../../redux/userAuthentication/authenticateUserAsync";
import { userLogInAsync } from "../../redux/userAuthentication/userLogInAsync";
import { userToken, usersData } from "../dataSeed/usersData.Seed";
import userServer from "../shared/userServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => userServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => userServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => userServer.close());

fdescribe("Test auth reducer async actions", () => {
  test.only("Should user login with right credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().authReducer.user).toMatchObject(usersData[0]);
  });
  test.only("Should not login user with wrong credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "cngeme" })
    );
    expect(store.getState().authReducer.user).not.toMatchObject(usersData[0]);
  });
  test.only("Should authenticate user with right token", async () => {
    await store.dispatch(
      authenticateUserAsync(userToken.access_token + "_" + 2)
    );
    expect(store.getState().authReducer.user).toMatchObject(usersData[1]);
  });
});
