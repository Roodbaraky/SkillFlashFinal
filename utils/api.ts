import axios from "axios";

export async function createUser(
  username: string,
  password: string,
  email: string
) {
  const signupBody = { username, password, email };
  try {
    console.log(signupBody);
    const { data } = await axios.post(
      "https://skillflashbackend.onrender.com/api/users/signup",
      signupBody
    );
    return data.user;
  } catch (err) {
    console.log(err); //do we need error handling? here?
  }
}

export function checkUserExists(username: string, password: string) {
  const loginBody = { username, password };

  return {
    username: "koo",
    password: "String11!!",
    email: "sdfsf@string.com",
    user_id: "string",
    decks: [],
  };
  //post request for axios
  //if successful goto next page
}
