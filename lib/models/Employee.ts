import { Bank } from "./Bank";
import { User } from "./User";

export type Employee = {
  id: number;
  user_id: number;
  user: User;
  bank_id: number;
  bank: Bank;
};
