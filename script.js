console.log("file attached");
let buttonStatus = "";
let text = document.querySelector("h2");


class GridCell {
    constructor(){
        this.value = "";
        this.isClickable = true;
    }

    makeNotClickable() {
        this.isClickable = false;
    }

    setValue(value){
        // TODO: maybe check if value already exists
        this.value = value;
    }

    reset(){
        this.value = "";
        this.isClickable = true;
    }

    // compare function
    shouldGameEnd() {
        // if player wins
        //break;
        // if draw
        //break ;
    }

}

class Grid {

    constructor() {
        this.cells = [];
        this.movesSoFar = 0;
        for( let i = 0; i < 9; i++) {
            let cell = new GridCell();
            this.cells.push(cell);
        }

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

    compareOutcomes( ) {
        // function to check the possibilities of win/draw/continue playing

        if (this.movesSoFar < 5)
        {
            // no one can win in less than 5 moves
            return;
        }

        // Return winning value if winning outcome met
        let winningOutcome;
        for (let i = 0; i < this.winningOutcomes.length; i++) {
            winningOutcome = this.winningOutcomes[i];
            if ( (this.cells[winningOutcome[0]].value !== "") &&
                (this.hasSameValue(this.cells[winningOutcome[0]], this.cells[winningOutcome[1]], this.cells[winningOutcome[2]]))) {
                return this.cells[winningOutcome[0]].value;
            }
        }

        if (this.movesSoFar === 9) {
            // if checked all combinations and board is full, no one won
            return "draw";
        }
    }

    hasSameValue(cell1, cell2, cell3) {
        return (cell1.value === cell2.value) && (cell2.value === cell3.value);
    }
}

//Player Class
class Player{
    constructor(symbol) {
        this.symbol = symbol;
        this.score = 0;
    }
}

// --------------------------
let playerX = new Player("X");
let playerO = new Player ("O");
let currentPlayer = playerX;


let grid  = new Grid();
let gridItems = document.getElementsByClassName("grid-item");
// add event listener to each box in the grid
// when a box inside the grid is clicked:
// if it is on (i.e. has no value x or o inside of it)
for(let i = 0; i < gridItems.length; i++) {
    let htmlCell = gridItems[i];
    let jsCell = grid.cells[i];
    htmlCell.addEventListener("click", (event) => {
        console.log("button clicked");
        if(!jsCell.isClickable){
            alert("Click on non-occupied box.");
        }
        else {
            htmlCell.innerText = currentPlayer.symbol;
            jsCell.setValue(currentPlayer.symbol);
            jsCell.makeNotClickable();

            grid.movesSoFar += 1;
            let result = grid.compareOutcomes();
            //
            if(!result) {
                switchTurn();
            }
            else {

                // win -- X, O, or draw
                // message display for winner or draw
                //and rest cells make not clickable and game end;
                if(result === "X") {
                    playerX.score ++;
                    text.innerText = "PlayerX won the game.";
                }
                else if(result === "O"){
                    playerO.score ++
                    text.innerText = "PlayerO won the game.";
                }
                else {
                    text.innerText = "It's a draw.";
                }
                grid.makeNotClickable();
            }

        }

    });
}

function switchTurn() {
    currentPlayer = (currentPlayer === playerX) ?  playerO :  playerX;
    text.innerText = `Player${currentPlayer.symbol}, make your move now.`;
}


let reset = document.querySelector("#reset");
reset.addEventListener("click", (event) => {
    console.log("it will reset the grid");
    event.preventDefault();
    grid.reset();
    for (let i = 0; i < gridItems.length; i++){
        gridItems[i].innerText = "";
    }
    text.innerText = `Player${currentPlayer.symbol}, make your move now.`;
    currentPlayer = playerX;
});











