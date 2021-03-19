**Project: TicTacToe**

**Introduction**:
Play 2-player TicTacToe here: https://kbala1.github.io/TicTacToe/.

**Technologies used**:
JavaScript, CSS and HTML.

**Approach**:
I used classes to encapsulate the data and behavior of the TicTacToe grid and of the players in order to separate the view and the business logic. To make the game feel more like a game with rewards for winning, I added a cat image (from the [Cat API](https://docs.thecatapi.com/)) and an audio sound when a player wins.

**My Journey**:
I have tried to integrate most of the topics I have learned in the last 3 weeks, such as: CSS Flexbox, CSS Grid, JavaScript event handlers, DOM manipulation, classes, objects, array methods, API, the DRY principle. This project taught me how to organize code in bigger projects and how to break down a big application into smaller components.

**How I solved for the winner**:
I created a list of all the positions necessary for a win and after each turn, I checked the list of possible winning outcomes to see if a player had placed their symbol in one of them.

**Main features through user stories**:

As a user:
* I am able to click on an empty cell and place my symbol.
* I am unable to click on a non-empty cell.
* I am able to keep track of when it is my turn.
* I am able to keep score over multiple games.
* I am able to see a message when I win, lose, or tie.
* I am unable to click on a cell once the game has ended.
* I am able to play multiple games without refreshing or start a new game with a reset button.
* I am rewarded for winning (a cat picture, an applause sound).
* I am able to play on screens of different sizes.

**Possible new features**:
* Letting a player play against the computer 
* Letting users pick other symbols.

**Planning**:
As part of my planning, I created [a very simple wireframe](https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C7f346c11254900189556971dad8fdefd/projects/M3eb85d0a36dfe53a451f59fb96e72e5f1616077401844/pages/f240b2a319ab48b0ab2466dd0dee3bbf/image/f240b2a319ab48b0ab2466dd0dee3bbf.png?1616126121316), wrote out the features I wanted to include, and created pseudo-code for the implementations of each of these features.
