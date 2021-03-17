console.log("file attached");
let buttonStatus = "";

class GridCell {
    constructor(){
        this.value = "";
        this.isClickable = true;
    }

    makeNotClickable() {
        this.isClickable = false;
    }

    addValue(value){
        // TODO: maybe check if value already exists
        this.value = value;
    }

    reset(){
        this.value = "";
        this.isClickable = true;
    }
}

class Grid {
    constructor() {
        this.cells = [];
        //
        for( let i = 0; i < 9; i++) {
            let cell = new GridCell();
            this.cells.push(cell);
        }
    }

    reset() {
        this.cells.forEach(cell => cell.reset());
    }
}



let grid = new Grid();
let gridItems = document.getElementsByClassName("grid-item");
// add event listener to each box in the grid
// when a box inside the grid is clicked:
// if it is on (i.e. has no value x or o inside of it)
for(let i = 0; i < gridItems.length; i++) {
    gridItems.addEventListener("click", (event) => {
        console.log("button clicked");
        isCellClickable(i);

    });
}
function isCellClickable(index) {
    return grid.cells[index].isClickable;
}







