let gameState = ["","","","","","","","",""]

let gameActive = true;
let currentPlayer = "X";



const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameStatus = document.querySelector('.game--status');
gameStatus.innerHTML = playerTurn()

function playerTurn(){
    return `Turn of: ${currentPlayer} player`
}
function gameWinner(){
    return `Congratulate ${currentPlayer} player, you win!!!!`
}
function gameTie(){
    return `Tie!!`
}

function PlayerChanged(){
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else 
    {
        currentPlayer = "X"
    }
}

function handleGameStatus(){
    PlayerChanged()
    gameStatus.innerHTML = playerTurn()
}

function cellPlayed(clickdCell,cellIndex){
    gameState[cellIndex] = currentPlayer
    clickdCell.innerHTML = currentPlayer
}

function handleCellClick(clickedCellE) {
    const clickedCell = clickedCellE.target;
    const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"))

    if (gameState[cellIndex] !== '' || gameActive == false) {
        return;
    }

    cellPlayed(clickedCell,cellIndex)
    handleWinValidation()

}

function handleWinValidation() {
    let roundWon = false
    for (let i = 0; i < 8; i++) {
        let winningCond = winningConditions[i]

        let a = gameState[winningCond[0]];
        let b = gameState[winningCond[1]];
        let c = gameState[winningCond[2]];

        if (a === "" || b === "" || c === "") {
            continue
        }

        if(a === b && b == c)
        {
            roundWon = true
            break
        }

    }
    if (roundWon) {
        gameActive = false
        gameStatus.innerHTML = gameWinner()
        return
    }

    if (!gameState.includes("")) {
        gameActive = false
        gameStatus.innerHTML = gameTie()
        return
    }

    handleGameStatus()
}

function handleRestart(){
    gameActive = true
    currentPlayer = "X"

    gameState = ["","","","","","","","",""]
    gameStatus.innerHTML = `Turn of ${currentPlayer} player`
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener("click",handleCellClick))
document.querySelector('.game--restart').addEventListener("click",handleRestart)