# activity log

| day | time | what was done |
| :----:|:-----| :-----|
| 7.6 | 3 | initialize frontend with create-react-app. First implementation of the wordle guess board  |
| 8.6 | 3 | First implementation of a keyboard. Separate keyboard into its own component. Start separating styles into own files |
| 8.6 | 2 | Change the simple title into a header (ugly first implementation) that includes the title and a few (currently unresponsive) buttons |
| 9.6 | 4 | Move guessboard into separate component. Put guessboard state into a context. Start to add logic to guessboard. Add listener for user typing with a keyboard |
| 9.6 | 1.5 | Add handler for clear and enter buttons and finish typing listener |
| 10.6 | 3 | Add handler and context for guessboard and keyboard tiles changing colors depending on guesses |
| 10.6 | 1.5 | Improve Key.js component. Remove last inline style for more uniform use of .css modules |
| 12.6 | 4 | Add handler for game state. Implement first frontend tests. Struggled to figure out how to access context variables within tests. Ended up implementing a wrapper that renders the values |
| 13.6 | 4.5 | Start implementing backend. Add words to MongoDB. Add route for all words, daily word and for checking whether a word exists in the database. Add axios to frontend and get the daily word from the backend. Add checks for if current guess input exists in the database |
| 14.6 | 4 | handleBackgroundColor in Board.js did not account for every situation. Refactored the component, should be fixed. Tests for handleEnter broke after adding backend connection through axios. Spent quite a while trying to fix, currently unsure how to |
| 14.6 | 2 | add model and route for user in the backend. Add backend tests for word and user |
| 15.6 | 4 | add a few end-to-end tests with Cypress to frontend. Add CI/CD pipeline to github actions, verify it works. Pipeline does not yet include deploying to Render. Will add later when app is more complete |
| 16.6 | 6.5 | Working with multiple contexts ended up being difficult. Refactor board and game state contexts into Redux states. Ended up being a little difficult to get it working, took a while to fix everything that ended up broken. Function handleBackgroundColor still didn't account for every situation. Tried to fix it more. To do: figure out what to do with keyboard color context |
| 17.6 | 2.5 | add token authentication and a route for changing username to the backend. Add tests for changing username, make sure tests work with token authentication |
| 18.6 | 1.5 | change header in frontend to use Material UI library. Struggled for a while to find a way to keep the title centered even when adding buttons to the side |
| 19.6 | 8 | Implement sessions in database. Implement modal window and functionality for logging into frontend. Implement modal base for the other ones needed later. Currently the other ones do not render anything useful. Refactor modal component out of Header into its own thing |
| 20.6 | 5 | more modal work. implement board states into local storage to keep game from reseting on refresh |
| 21.6 | 6 | Change reducer and local storage structure a little. Implement saving stats to backend after game ends |
| 25.6 | 5 | modal for changing username and deleting account |
| 26.6 | 6 | losing my mind on a bug on some combination of keyboard listener / enter handler / word service. Kind of ugly band-aid implemented to prevent additional enter inputs. Small write up about it in boardReducer.js |
| 26.6 | 10 | Not satisfied with using Material UI for header. Fixing modals with it proved too annoying for me. Create a new header, refactor the application to use Tailwind for CSS and remove most of Material UI aside from a few uses in InputForm.js where it works fine. Create a base for modals, implement settings modal and add an option for dark/light mode toggle using Tailwind |
| 27.6 | 9 | Notification component and its redux state, stats modal, fiddle with colors |
| 28.6 | 2 | Refactor how gamestate reducer is called, fix a few lints |
| 2.7 | 7 | modals are complete, merge tailwind branch |
| :----:|:-----| :-----|
| total | 105 ||
