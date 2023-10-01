export interface User {
  id: number;
  name: string;
  role: "customer" | "admin";
  email: string;
  password: string;
  avatar: string;
}
