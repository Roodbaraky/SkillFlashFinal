import axios from "axios";
import { Card, HomeDeck } from "./utils";

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
	const { data } = await axios.get(
		`https://skillflashbackend.onrender.com/api/users/${usernameInput}`
	);
	return data.exist;
}
export async function getDecksByUsername(username: string) {
	const { data } = await axios.get(
		`https://skillflashbackend.onrender.com/api/decks/${username}`
	);
	return data.decks;
}

export async function getAllTags() {
	const { data } = await axios.get(
		`https://skillflashbackend.onrender.com/api/tags`
	);
	if (data.tags.length === 0) {
		return [];
	}

	return data.tags;
}

export async function getTagsWithQuery(tagCategory: string) {
	const { data } = await axios.get(
		`https://skillflashbackend.onrender.com/api/tags?tagCategory=${tagCategory}`
	);
	return data.tags;
}

export async function deleteUser(username: string) {
	const { data } = await axios.delete(
		`https://skillflashbackend.onrender.com/api/users/${username}`
	);
	return data;
}

export async function generateDeck(
	username: string,
	deckName: string,
	tags: string[]
) {
	console.log(username, deckName, tags);
	//check username exist before post request?
	const { data } = await axios.post(
		`https://skillflashbackend.onrender.com/api/decks/${username}`,
		{ deckName: deckName, tags: tags }
	);
	return data.deck;
}

export async function generateMoreQuestions(
	deckId: string,
	deckName: string,
	tags: string[]
) {
	// check username exist before post request?
	const { data } = await axios.patch(
		`https://skillflashbackend.onrender.com/api/decks/${deckId}`,
		{ deckName: deckName, tags: tags }
	);
	return data.deck;
}

export async function deleteDeck(deckId: string) {
	const { data } = await axios.delete(
		`https://skillflashbackend.onrender.com/api/decks/${deckId}`
	);
	return data;
}

export async function updateCards(deckId: string, cards: Card[]) {
	const { data } = await axios.patch(
		`https://skillflashbackend.onrender.com/api/decks/${deckId}/cards`,
		{ cards: cards }
	);
	return data.deck;
}

export async function updateUserInfo(username: string, userInfo: object) {
	await axios.patch(`https://skillflashbackend.onrender.com/api/users/${username}`, userInfo)
}