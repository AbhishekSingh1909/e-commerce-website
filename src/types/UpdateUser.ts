export interface UpdateUser {
  id: number;
  updateUser: Partial<UpdateUserDto>;
}

export interface UpdateUserDto {
  name: string;
  role: "customer" | "admin";
  email: string;
  password: string;
  avatar: string;
}
