export interface User {
  id: number;
  name: string;
  role: "customer" | "admin";
  email: string;
  password: string;
  avatar: string;
}

export type JWTToken = {
  access_token: string;
  refresh_token: string;
};

export interface LoginCredential {
  email: string;
  password: string;
}

export type UserAuth = {
  user: User | undefined;
  jwtToken: JWTToken | undefined;
};

export enum Role {
  "admin",
  "customer",
}
