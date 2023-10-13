import { createStore } from "../../redux/store";
import { createUsersAsync } from "../../redux/users/createUserAsync";
import { getAllUsersAsync } from "../../redux/users/getAllUsersAsync";
import { getSingleUsersAsync } from "../../redux/users/getSingleUserAsync";
import { updateUserAsync } from "../../redux/users/updateUserAsync";
import { CreateNewUser } from "../../types/CreateNewUser";
import { UpdateUser, UpdateUserDto } from "../../types/UpdateUser";
import { usersData } from "../dataSeed/usersData.Seed";
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

describe("Test user reducer async actions", () => {
  test("get all users", async () => {
    await store.dispatch(getAllUsersAsync());
    expect(store.getState().userReducer.users.length).toBe(3);
  });
  test("get a user by user Id", async () => {
    await store.dispatch(getSingleUsersAsync(usersData[0].id));
    expect(store.getState().userReducer.singleUser?.id).toBe(usersData[0].id);
  });
  test("should create a user", async () => {
    const user: CreateNewUser = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      password: "1234",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    await store.dispatch(createUsersAsync(user));
    const createdUser = store.getState().userReducer.users;
    console.log("createdUser", createdUser);
    expect(store.getState().userReducer.users.length).toBe(1);
  });
  test("should update a user", async () => {
    const updateUserDto: UpdateUserDto = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      password: "ABCDE",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      role: "customer",
    };
    const updateUser: UpdateUser = {
      id: 1,
      updateUser: updateUserDto,
    };
    const action = await store.dispatch(updateUserAsync(updateUser));
    console.log("action", action.payload);

    expect(action.payload).toMatchObject({
      id: 1,
      updateUser: {
        name: "Nik Jones",
        email: "nico.Jones@gmail.com",
        password: "ABCDE",
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      },
    });
  });
  test("should not update a user with worng user Id", async () => {
    const updateUserDto: UpdateUserDto = {
      name: "Nik Jones",
      email: "nico.Jones@gmail.com",
      password: "ABCDE",
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      role: "customer",
    };
    const updateUser: UpdateUser = {
      id: 83,
      updateUser: updateUserDto,
    };
    await store.dispatch(updateUserAsync(updateUser));
    const error = store.getState().userReducer.error;
    expect(error).toBe("Request failed with status code 400");
  });
});
