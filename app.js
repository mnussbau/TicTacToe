
const statusMessage = document.querySelector('.game-status');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusMessage.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex]= currentPlayer;
    clickedCell.style.backgroundColor = 'red';
    clickedCell.innerHTML = currentPlayer;


}
function handlePlayerChange() {

    currentPlayer=currentPlayer==="X"?"O":"X";
    statusMessage.innerHTML= currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [0, 4, 8],
    [2, 5, 8],
    [3, 4, 5],
    [2, 4, 6],
    [6, 7, 8]


];
function handleResultValidation() {
    let roundWon =false;
    for(let i = 0; i <= 7; i++){
        const winningCondition = winningConditions[i];
        let a = gameState[winningCondition[0]];
        let b = gameState[winningCondition[1]];
        let c = gameState[winningCondition[2]];
        if(a===''||b===''||c===''){
            continue;
        }

        if(a==b && b==c){
            roundWon=true;
            break;

        }

    }
    if(roundWon){
        statusMessage.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
let roundDraw = !gameState.includes("");
if(roundDraw){
    statusMessage.innerHTML = drawMessage();
    gameActive = false;
    return;



}
    
    
handlePlayerChange();

}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
      );
    if(gameState[clickedCellIndex] !==""||!gameActive){
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation();

}
function handleRestartGame() {
    gameActive=true;
    currentPlayer ="X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusMessage.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => {cell.innerHTML="";
    cell.style.backgroundColor = "yellow"; });





}
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.style.backgroundColor = "yellow";
});
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
