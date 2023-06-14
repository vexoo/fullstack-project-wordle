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
| :----:|:-----| :-----|
| total | 30.5 ||

