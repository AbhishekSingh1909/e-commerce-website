export interface UpdateUser {
  id: number;
  updateUser: Partial<UpdateUserDto>;
}

export interface UpdateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
}
