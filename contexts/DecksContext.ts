import { Dispatch, SetStateAction, createContext } from "react";
import { HomeDeck } from "@/utils/utils";

export type DecksContextType = {
	decks: HomeDeck[];
	setDecks: Dispatch<SetStateAction<HomeDeck[]>>;
};

export const DecksContext = createContext<DecksContextType>({
	decks: [],
	setDecks: (decks = []) => {},
});
