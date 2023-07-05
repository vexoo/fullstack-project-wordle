# fullstack-project-wordle

The project attempts to mimic the Wordle game, now owned by New York Times. 
<br>User instructions for the actual game are found in the deployed application by clicking the information icon on the top left

Frontend of the project is made in React, with [Tailwind](https://tailwindcss.com/) being used for CSS.
<br>Backend is done with Node and Express.

Backend connects to a MongoDB database that stores user data, and a list of words from where the daily word is fetched and player guesses are checked. The list is also included in the repository root (words.json)