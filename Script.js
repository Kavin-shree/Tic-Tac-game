let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
];

function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        let btn = document.createElement("button");
        btn.classList.add("cell");
        btn.innerText = cell;
        btn.onclick = () => makeMove(index);
        boardDiv.appendChild(btn);
    });
}

function makeMove(index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    renderBoard();
}

function checkResult() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("status").innerText =
                `Player ${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "Draw!";
        gameActive = false;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").innerText = "";
    renderBoard();
}

renderBoard();
