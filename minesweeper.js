const grid = document.getElementById("grid");
const searchButton = document.getElementById('search-btn');
const resetButton = document.getElementById('reset-btn');
const bombCount = 12; // fixed number of bombs
const message = document.getElementById('message')
let flagCount = bombCount;
let counter = 0;

function generateGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        const row = grid.insertRow(i);
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell(j);
            cell.setAttribute("data-mine", "false");
            cell.onclick = function() {
                if (searchButton.classList.contains('flagging')) {
                    flagCell(this);
                } else {
                    clickCell(this);
                }
            };
        }
    }
    addMines();
    
}

function addMines() {
    for (let i = 0; i < bombCount; i++) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const cell = grid.rows[row].cells[col];
        cell.setAttribute("data-mine", "true");
    }
}

function flagCell(cell) {
    if (cell.innerHTML === "🚩") {
        cell.innerHTML = "";
        flagCount++;
        console.log(counter -= 1)
    } else {
        cell.innerHTML = "🚩";
        flagCount--;
        console.log(counter += 1)
    }
    checkCompletion();
    message.innerHTML = `Flag ${counter} / 12`;
}

function clickCell(cell) {
    if (cell.getAttribute("data-mine") === "true") {
        revealMines();
        grid.style.pointerEvents = "none";
        message.innerText = "Game Over... Better luck next time.";
    } else {
        cell.className = "clicked";
        const mineCount = countAdjacentMines(cell);
        if (mineCount > 0) {
            cell.innerHTML = mineCount;
        } else {
            revealAdjacentCells(cell);
        }
        checkCompletion();
    }
}

function countAdjacentMines(cell) {
    let mineCount = 0;
    const cellCol = cell.cellIndex;
    const cellRow = cell.parentNode.rowIndex;

    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            if (grid.rows[i].cells[j].getAttribute("data-mine") === "true") {
                mineCount++;
            }
        }
    }
    return mineCount;
}

function revealAdjacentCells(cell) {
    const cellCol = cell.cellIndex;
    const cellRow = cell.parentNode.rowIndex;

    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            const adjacentCell = grid.rows[i].cells[j];
            if (!adjacentCell.classList.contains("clicked")) {
                clickCell(adjacentCell);
            }
        }
    }
}

// reveal all mines at game over
function revealMines() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = grid.rows[i].cells[j];
            if (cell.getAttribute("data-mine") === "true") {
                cell.className = "mine";
            }
        }
    }
}

// check game completion
function checkCompletion() {
    const clickedCellsCount = document.getElementsByClassName("clicked").length;
    const totalCells = 100;

    if (clickedCellsCount + bombCount === totalCells) {
        revealMines();
        grid.style.pointerEvents = "none";
        message.innerText = "Congratulations! You won.";
    }
}

// toggle flagging mode
function searchFlag() {
    searchButton.classList.toggle('flagging');
    if (searchButton.classList.contains('flagging')) {
        searchButton.innerText = "SEARCHING";
    } else {
        searchButton.innerText = "FLAGGING";
    }
}

// Event listener for Reset Mines button
resetButton.addEventListener('click', function() {
    flagCount = bombCount;
    grid.style.pointerEvents = "all";
    generateGrid();
    counter = 0;
    message.innerHTML = `Flag ${counter} / 12`;
});

generateGrid();

