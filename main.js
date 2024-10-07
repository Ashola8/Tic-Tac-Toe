const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const starterSelect = document.getElementById('starter');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

// Starts the game based on selected starter
function startGame() {
currentPlayer = starterSelect.value;
document.getElementById('player-select').style.display = 'none';
board.style.display = 'grid';
restartButton.style.display = 'block';
}

// Handles cell clicks
function handleCellClick(event) {
const cell = event.target;
const index = cell.getAttribute('data-index');

if (gameState[index] !== '' || !gameActive) {
return;
}

gameState[index] = currentPlayer;
cell.textContent = currentPlayer;

if (checkWin()) {
winnerDisplay.textContent = `${currentPlayer} wins!`;
gameActive = false;
return;
}

if (!gameState.includes('')) {
winnerDisplay.textContent = `It's a draw!`;
gameActive = false;
return;
}

currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Checks if a player has won
function checkWin() {
return winningCombinations.some(combination => {
const [a, b, c] = combination;
return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
});
}

// Restarts the game
function restartGame() {
gameState = ['', '', '', '', '', '', '', '', ''];
cells.forEach(cell => {
cell.textContent = '';
});
currentPlayer = starterSelect.value;
gameActive = true;
winnerDisplay.textContent = '';
}

// Attaches event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));