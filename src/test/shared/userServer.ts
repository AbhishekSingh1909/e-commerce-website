import { rest } from "msw";
import { setupServer } from "msw/node";

import { usersData, userToken } from "../dataSeed/usersData.Seed";
import { AxiosError } from "axios";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  //   rest.get("/api/user", (req, res, ctx) => {
  //     return res(ctx.json("John Smith"), ctx.delay(150));
  //   }),

  rest.post(
    "https://api.escuelajs.co/api/v1/auth/login",
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const user = usersData.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        console.log("userToken.access_token", userToken.access_token);
        console.log(
          "userToken  user.id",
          userToken.access_token + ":" + user.id
        );
        const token = userToken.access_token + "_" + user.id;
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        const error = new AxiosError("user cedentials are not valid");
        return res(ctx.json(error));
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/auth/profile", (req, res, ctx) => {
    console.log("req.headers.get", req.headers.get("Authorization"));
    const token = req.headers.get("Authorization")?.split(" ")[1];
    console.log("token", token);
    const access_token = token?.split("_")[0];
    const userId = token?.split("_")[1];

    const user = usersData.find((u) => u.id === Number(userId));
    console.log("user data", user);
    if (access_token === userToken.access_token && user) {
      return res(ctx.json(user));
    } else {
      ctx.status(401);
      const error = new AxiosError("UnAuthorized User");
      return res(ctx.json(error));
    }
  }),
];

const userServer = setupServer(...handlers);

export default userServer;
