export function createUser(username: string, password: string, email: string) {
  const signupBody = { username, password, email };
  // post new user
  return {
    username: "koo",
    password: "string",
    email: "sdfsf@string.com",
    user_id: "string",
    decks: [],
  };
}

export function checkUserExists(username: string, password: string) {
  const loginBody = { username, password };
  console.log(loginBody);
  return {
    username: "koo",
    password: "string",
    email: "sdfsf@string.com",
    user_id: "string",
    decks: [],
  };
  //post request for axios
  //if successful goto next page
}
