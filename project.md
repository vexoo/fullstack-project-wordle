# fullstack-project-wordle

The project attempts to mimic the Wordle game, now owned by New York Times.
<br>User instructions for the actual game are found in the deployed application by clicking the information icon on the top left.

One thing to note is that stats are currently only saved to the user table in the database, and not to local storage, so creating an account is heavily incentivized before testing the app.
Adding a separate 'infinite' mode 

Frontend of the project is made in React. Project started off with using plain css modules for styling. Header and modals were implemented with [Material UI](https://mui.com/).

Getting the modals to look the way I wanted them to and implementing conditional styles were the most annoying parts of Material UI, so I ended up removing almost all of Material UI from the project. Only place where it remains is a few uses of its TextField component.
<br>I ended up redoing styling with [Tailwind](https://tailwindcss.com/), and transitions (mostly opening/closing modals and notification) were implemented with [Headless UI](https://headlessui.com/).

Backend of the project is done with Node and Express.
<br>Backend connects to a MongoDB database that stores user data, and a list of words where the daily word is fetched from and player guesses are checked. The list is also included in the repository root (words.json)
