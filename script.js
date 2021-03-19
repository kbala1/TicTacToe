/** TicTacToe classes **/
//Player Class
class Player{
    constructor(symbol) {
        this.symbol = symbol;
        this.score = 0;
    }
}

// GridCell class
class GridCell {
    constructor(){
        this.value = "";
        this.isClickable = true;
    }

    makeNotClickable() {
        this.isClickable = false;
    }

    setValue(value){
        this.value = value;
    }

    reset(){
        this.value = "";
        this.isClickable = true;
    }
}

// Grid class
class Grid {
    constructor() {
        this.cells = [];
        this.movesSoFar = 0;
        for(let i = 0; i < 9; i++) {
            let cell = new GridCell();
            this.cells.push(cell);
        }

        // this represents the 8 different cell combinations
        // with which a player could win
        this.winningOutcomes = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    reset() {
        this.movesSoFar = 0;
        this.cells.forEach(cell => cell.reset());
    }

    makeNotClickable() {
        this.cells.forEach(cell => cell.makeNotClickable());
    }

    /**
     * This function checks if a player has won, if a draw has been reached, or if game should continue.
     * It only compares positions if at least 5 moves have been played.
     * If a winner is found, it will return an object with the winner's symbol and the winning positions.
     * If a draw has been reached, it will return an object with the winner property set to draw.
     * If the game should continue, it will return nothing.
     */
    compareOutcomes( ) {
        if (this.movesSoFar < 5)
        {
            // no one can win in less than 5 moves
            return;
        }

        // check if same non-empty value is found in each cell of each combination of winning positions
        // return winner symbol and winning positions if winner found
        let winningOutcome;
        for (let i = 0; i < this.winningOutcomes.length; i++) {
            winningOutcome = this.winningOutcomes[i];
            if ((this.cells[winningOutcome[0]].value !== "") &&
                (this.hasSameValue(this.cells[winningOutcome[0]], this.cells[winningOutcome[1]],
                    this.cells[winningOutcome[2]]))) {

                return {winner: this.cells[winningOutcome[0]].value, winningPositions: winningOutcome};
            }
        }

        if (this.movesSoFar === 9) {
            // if checked all combinations and board is full, no one won
            return {winner: "draw"};
        }
    }

    hasSameValue(cell1, cell2, cell3) {
        return (cell1.value === cell2.value) && (cell2.value === cell3.value);
    }
}


// ----------------------------------------------
/** TicTacToe implementation **/

// initialize two players
let playerX = new Player("X");
let playerO = new Player ("O");
// PlayerX will always go first
let currentPlayer = playerX;

// initialize the grid (and grid cells)
let grid  = new Grid();
let gameEnded = false;

// get html elements to be used on a click of a TicTacToe grid cell
let gridItems = document.getElementsByClassName("grid-item");
let message = document.querySelector("h2");

let imageTag = document.createElement("img");
let main = document.querySelector("main");

// add audio
let audio = new Audio("Various-01.wav");

// add event listener to each cell in the grid
for(let i = 0; i < gridItems.length; i++) {
    let htmlCell = gridItems[i];
    let jsCell = grid.cells[i];
    htmlCell.addEventListener("click", (event) => {
        // User cannot change value of a cell that already has a value.
        event.preventDefault();
        if(!jsCell.isClickable) {
            if (!gameEnded) {
                alert("Click on non-occupied box.");
            }
        }
        else {
            // if a non-occupied cell is clicked
            // occupy the cell with player symbol
            htmlCell.innerText = currentPlayer.symbol;
            jsCell.setValue(currentPlayer.symbol);
            jsCell.makeNotClickable();

            // check to see if game has been won, ended in a draw, or should continue
            grid.movesSoFar += 1;
            let result = grid.compareOutcomes();
            if(!result) {
                // if game should continue, players should switch turns
                switchTurn();
            }
            else {
                // If game ends, grid cells should not be clickable
                grid.makeNotClickable();
                gameEnded = true;

                if (result.winner === "draw") {
                    message.innerText = "It's a draw.";
                } else {
                    /**
                     * If game is won:
                     * Update score, declare winner
                     * Show winning positions
                     * Give reward (random cat -- changes every time someone wins)
                     * Play an applause sound.
                     */
                    if (result.winner === "X") {
                        playerX.score += 1;
                        document.getElementById("px").innerText = `Score: ${playerX.score}`;
                    }
                    else if(result.winner === "O"){
                        playerO.score += 1;
                        document.getElementById("po").innerText = `Score: ${playerO.score}`;
                    }
                    let winningPositions = result.winningPositions;
                    winningPositions.forEach(position => gridItems[position].style.background = "red");
                    message.innerText = `Player${result.winner} won the game. Your reward is a cute cat!`;
                    audio.play();
                    callKitty();
                }
            }
        }
    });
}

// function used to change which player is up
function switchTurn() {
    currentPlayer = (currentPlayer === playerX) ?  playerO :  playerX;
    message.innerText = `Player${currentPlayer.symbol}, make your move now.`;
}

// When a player wins, a random kitty will appear on grid (pulled from an API)
const catRandomEndpoint = 'https://api.thecatapi.com/v1/images/search';
function callKitty() {
    fetch(catRandomEndpoint)
        .then(response => response.json())
        .then((json => {
            let catUrl = json[0].url;
            imageTag.setAttribute("id", "randomCatImage");
            imageTag.setAttribute("src", catUrl);
            main.insertBefore(imageTag, main.firstChild);
        }))
     .catch(err => console.log(err));
}

// When reset button is clicked, grid should be cleared, reward should go away
// Scores will be kept
let reset = document.querySelector("#reset");
reset.addEventListener("click", (event) => {
    event.preventDefault();
    grid.reset();
    if(imageTag.parentNode) {
        main.removeChild(imageTag);
    }
    for (let i = 0; i < gridItems.length; i++){
        gridItems[i].innerText = "";
        gridItems[i].style.background = "";
    }
    message.innerText = `Player${currentPlayer.symbol}, make your move now.`;
    currentPlayer = playerX;
    gameEnded = false;
});
