export interface IUser {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface ILogin {
  email: string;
  password: string;
}
