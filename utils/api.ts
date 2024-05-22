import axios from "axios";
import { HomeDeck } from "./utils";

export async function createUser(
	username: string,
	password: string,
	email: string
) {
	const signupBody = { username, password, email };
	try {
		const { data } = await axios.post(
			"https://skillflashbackend.onrender.com/api/users/signup",
			signupBody
		);
		return data.user;
	} catch (err) {
		console.log(err); //do we need error handling? here?
	}
}

export async function checkUserExists(username: string, password: string) {
	const loginBody = { username, password };
	try {
		const { data } = await axios.post(
			"https://skillflashbackend.onrender.com/api/users/login",
			loginBody
		);

		return data.user;
	} catch (err) {
		return err;
		//do we need error handling? here?
	}
}

export async function doesUserExist(usernameInput: string) {
	try {
		const { data } = await axios.post(
			`https://skillflashbackend.onrender.com/api/users/${usernameInput}`
		);
		console.log(data);
		return true;
	} catch (err) {
		console.log(err); //do we need error handling? here?
	}
}
export async function getDecksByUsername(username: string) {
	try {
		// const { data } = await axios.post(
		// 	`https://skillflashbackend.onrender.com/api/decks/${username}`
		// );
		// console.log(data);
		return testDecks;
	} catch (err) {
		console.log(err); //do we need error handling? here?
	}
}

const testDecks: HomeDeck[] = [
	{
		deckId: "deck1",
		deckName: "string",
		tags: ["javascript", "react", "node"],
		totalCards: 6,
	},
	{
		deckId: "342534543",
		deckName: "deck2",
		tags: ["javascript", "react", "node"],
		totalCards: 12,
	},
];
