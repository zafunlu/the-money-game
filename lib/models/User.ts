export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  avatar: string;
  about: string;
  created_at: Date | string;
  updated_at: Date | string;
};

export enum UserRole {
  Normal,
  Admin = 10,
}
