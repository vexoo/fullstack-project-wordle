# fullstack-project-wordle

The project attempts to mimic the Wordle game, now owned by New York Times.
<br>User instructions for the actual game are found in the deployed application by clicking the information icon on the top left.

One thing to note is that stats are currently only saved to the user table in the database, with no copy being saved to local storage, so creating an account is heavily incentivized before testing the app.

Frontend of the project is made in React. Project started off with using plain css modules for styling. Header and modals were implemented with [Material UI](https://mui.com/).

Getting the modals to look the way I wanted them to and implementing conditional styles were the most annoying parts of Material UI, so I ended up removing almost all of Material UI from the project. Only place where it remains is a few uses of its TextField component.
<br>I ended up redoing styling with [Tailwind](https://tailwindcss.com/), and transitions (mostly opening/closing modals and notification) were implemented with [Headless UI](https://headlessui.com/).

Backend of the project is done with Node and Express.
<br>Backend connects to a MongoDB database that stores user data, security questions plus their answers and a list of words where the daily word is fetched from and player guesses are checked. The list is also included in the repository root(words.json). Both password and answer to security question are hashed

Running the app locally in its current configuration requires a connection to a mongoDB database.

To run the app locally:

1.  clone the repository to your computer

2.  create a `.env` file in project root with four variables:

        * MONGODB_URI
        * TEST_MONGODB_URI
        * PORT
        * SECRET

	MONGODB_URI and TEST_MONGODB_URI are addresses to the databases that backend connects to
	<br> PORT can be any available port
	<br> SECRET can be any string


3. run commands

   > `npm install`

   > `npm start` OR `npm run dev` (for nodemon; automatic restarts on code change)

   in project root to install backend dependencies and launch backend

4. run commands 

   > `npm install`

   > `npm start`

	 inside /frontend folder to install frontend dependencies and launch frontend
