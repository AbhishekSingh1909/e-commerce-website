import { createStore } from "../../redux/store";
import { userAccess_token } from "../../redux/userAuthentication/authReducer";
import { authenticateUserAsync } from "../../redux/userAuthentication/authenticateUserAsync";
import { userLogInAsync } from "../../redux/userAuthentication/userLogInAsync";
import { userToken, usersData } from "../dataSeed/usersData.Seed";
import authServer from "../shared/authServer";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => authServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => authServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => authServer.close());

describe("Test auth reducer async actions", () => {
  test("Should user login with right credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "changeme" })
    );
    expect(store.getState().authReducer.user).toMatchObject(usersData[0]);
  });
  test("Should not login user with wrong credential", async () => {
    await store.dispatch(
      userLogInAsync({ email: "john@mail.com", password: "cngeme" })
    );
    expect(store.getState().authReducer.error).toBe(
      "user's cedential is not valid"
    );
  });
  test("Should authenticate user with right token", async () => {
    await store.dispatch(
      authenticateUserAsync(userToken.access_token + "_" + 2)
    );
    expect(store.getState().authReducer.user).toMatchObject(usersData[1]);
  });
  test("Should not authenticate user with worng token", async () => {
    await store.dispatch(
      authenticateUserAsync(userToken.refresh_token + "_" + 10)
    );
    expect(store.getState().authReducer.error).toBe(
      "The user is not authorized"
    );
  });
});
