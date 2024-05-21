import { Dispatch, SetStateAction, createContext } from "react";

interface User {
  username?: string;
  password?: string;
  email?: string;
  user_id?: string;
  decks?: number[] | null;
  _id?: string;
}

export const UserContext = createContext<
  [User, Dispatch<SetStateAction<User>>]
>([{}, () => {}]);
