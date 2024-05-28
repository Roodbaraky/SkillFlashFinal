# SkillFlash Frontend
Hi 👋 Welcome to SkillFlash!

This is an AI powered flashcard app built by **Team *'elloworld* **to help you study for tech interviews.

SkillFlash is built in React Native x Expo and written using Typescript.

This is the repository for the frontend build of SkillFlash, you can find out backend repo at ... and the hosted API at ...

You can find a demo of SkillFlash here: ....

## Features
### User Accounts
- Users can create new accounts with a unique username and email addresses
- Users can log into an existing account and see decks created linked to the account
- Users can change their username, email address and password
- At present, users must be logged in to use SkillFlash as the practice mode relies on retrieving specific user decks

User authentication is handled using the *bcrypt.js* library for node.js. This ensures that no unobscured passwords exist either within the app or its database at any time.
*Bcrypt* uses a salt and hashing algorithm to generate secure passwords which cannot be *decrypted* using typical methods. The hashing factor is adjustable to increase the time/resource demand of hashing, effectively influencing the security of the authentication and the time taken to attempt to break the hash.
In our case, the settings are relatively moderate, as user data stored within the app is not especially sensitive and only pertains to generic tech trivia.

On log in, bcrypt uses information stored within the hashed password of the user in the database and compares it against the entered password, once hashed. If the hashes match, the user is authenticated and can access the apps features.

### Deck creation / deletion 
- Users can generate new flashcards using a series of keyword tags passed to an LLM
- Users can choose to generate more flashcards to expand their existing decks
- Users can delete decks when they are no longer required

The deck generation process is powered by *Cohere AI* using *few-shot prompting* in a preamble template, which is adjusted to the users inputs.
A list of the user's selected tags is passed into the preamble which is sent to the *Cohere API*. This contains some information on how to structure the response, with examples of expected responses and precise instructions. 
The response from *Cohere AI* is then processed into a usable format to map onto card objects and stored in the database. Quality control measures ensure that unnacceptable responses, such as too few correctly structured cards, are rejected and an appropriate error message is displayed. In the event of partial erroneous responses, the resultant deck is filtered and stored with the offending card objects ommitted.
Prompt injection is mitigated by preventing the end-user from interfacing with the LLM directly, with a pre-approved library of possible tags and closed inputs.


### Practice
- Users can practice with their generated flashcards ad libitum
- Users can flip cards to see a model answer for each question
- Users can swipe *'yes'* or *'no'* on cards, indicating their level of confidence on the topic
- Users are prompted to practice on cards they are less confident on first, when loading a deck

The practice mechanic is built on the *react-native-deck-swiper* library, which provides the animation and deck cycling functionality. The deck swiper is set to infinitely loop through the flashcards array and change the properties of each card i.e. *Y or N* stats corresponding to swipes.
At each deck cycle, logic is applied to reorder the cards in accordance with their properties, moving cards with a greater *N* than *Y* value to the top of the pile.
The user can exit practice at any point, which auto updates the state of the deck in the app instance *and* database, meaning they can pick up exactly where they left off when they reopen the app.


## Get Started 
To run this project locally...

### Prerequisites
- Node.js v22.2.0 or above
- NPM v10.7.0 or above OR equivalent
- *Ideally* access to a smartphone with ExpoGo OR equivalent emulator
- The ExpoGo mobile application *-latest version*
It is not recommended to run the app using Expo's web preview.

### Installation
- Clone the repository
  - `git clone https://github.com/https://github.com/Roodbaraky/SkillFlashFrontend`
- Navigate to the project directory
  - `cd skillsflashfrontend`
- Install the dependencies
  - `npm install`

### Execution
- Start the Expo server
  - `npx expo start`
- Connect via android or iOS / emulator
  - `a` or Scan the QR Code in the ExpoGo app

### Usage
You may either log in with one of the following test accounts ...
Or sign up and create a new account to use the app

## Limitations
This application was created as part of of the Northcoders Software Development bootcamp and as a result, was subject to several constraints:
- Free / free trial software and APIs
- Project duration of 3 weeks *-start to finish*
- Function dicated by existing libraries and packages / compatibility with each other

## Stretch Goals
We wanted to include much more functionality in the final release of the app, but ultimately decided to throttle its features to ensure a robust minimum viable product (MVP) was complete by the project deadline. Some goals for further development on SkillFlash include:
- AI analysis of job postings *-via webscraping / paste*
- Offline mode / local storage of flashcards
- Light / Dark mode toggle 
- Push notifications and *Duolingo-esque* practice reminders
- Friends list / see other users' flashcards
- Create new custom tags for deck generation
- Manually create and edit flashcards

## Acknowledgements
Huge thanks is in order to all of the students and mentors on the March 2024 Software Development Cohort.
In particular, the members of *'elloworld* for their hard work and dedicated contributions over the course of the project:
- Ana Gomes
- Huajie He
- Koorosh Roodbaraky
- Wanwan *(wendy)* Shi


