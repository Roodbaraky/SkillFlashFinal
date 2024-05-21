import { Dispatch, SetStateAction, createContext } from "react";

interface User {
  username?: string;
  password?: string;
  email?: string;
  user_id?: string;
  decks?: number[] | null;
  _id?: string;
}
export type UserContextType = {
  userDetails: User;
  setUserDetails: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext<UserContextType>({
  userDetails: {},
  setUserDetails: (userDetails: object) => {},
});
