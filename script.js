let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let difficulty = "hard";
let scores = {
    player: 0,
    ai: 0,
    draws: 0
};

const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const difficultySelect = document.getElementById("difficulty");
const playerScoreDisplay = document.getElementById("playerScore");
const aiScoreDisplay = document.getElementById("aiScore");
const drawScoreDisplay = document.getElementById("drawScore");
const particlesContainer = document.getElementById("particles");
const confettiContainer = document.getElementById("confetti-container");

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

function createParticles() {
    const colors = ["rgba(59, 130, 246, 0.15)", "rgba(99, 102, 241, 0.12)", "rgba(96, 165, 250, 0.1)"];
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 15 + "s";
        particle.style.animationDuration = (10 + Math.random() * 10) + "s";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particlesContainer.appendChild(particle);
    }
}

function createConfetti() {
    const colors = ["#3b82f6", "#6366f1", "#a78bfa", "#60a5fa", "#38bdf8", "#22c55e"];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.className = "confetti";
            confetti.style.left = Math.random() * 100 + "%";
            confetti.style.top = "-10px";
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
            confetti.style.animationDuration = (2 + Math.random() * 2) + "s";
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

function checkWinner(boardState) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return null;
}

function isBoardFull(boardState) {
    return boardState.every(cell => cell !== "");
}

function minimax(boardState, depth, isMaximizing, alpha, beta, maxDepth) {
    const winner = checkWinner(boardState);
    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (isBoardFull(boardState)) return 0;
    if (depth >= maxDepth) return 0;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                const newBoard = [...boardState];
                newBoard[i] = "O";
                const evaluation = minimax(newBoard, depth + 1, false, alpha, beta, maxDepth);
                maxEval = Math.max(maxEval, evaluation);
                alpha = Math.max(alpha, evaluation);
                if (beta <= alpha) break;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                const newBoard = [...boardState];
                newBoard[i] = "X";
                const evaluation = minimax(newBoard, depth + 1, true, alpha, beta, maxDepth);
                minEval = Math.min(minEval, evaluation);
                beta = Math.min(beta, evaluation);
                if (beta <= alpha) break;
            }
        }
        return minEval;
    }
}

function findBestMove() {
    let bestMove = -1;
    
    if (difficulty === "easy") {
        const emptyCells = board.map((cell, index) => cell === "" ? index : -1).filter(i => i !== -1);
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
    
    let maxDepth = difficulty === "medium" ? 3 : Infinity;
    let bestScore = -Infinity;
    
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            const newBoard = [...board];
            newBoard[i] = "O";
            const score = minimax(newBoard, 0, false, -Infinity, Infinity, maxDepth);
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute("data-index"));

    if (board[index] !== "" || !gameActive || currentPlayer !== "X") {
        return;
    }

    updateCell(cell, index);
    checkResult();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function checkResult() {
    const roundWinner = checkWinner(board);

    if (roundWinner) {
        announceWinner(roundWinner);
        gameActive = false;
        highlightWinningCells();
        if (roundWinner === "X") {
            createConfetti();
        }
        return;
    }

    if (isBoardFull(board)) {
        announceDraw();
        gameActive = false;
        return;
    }

    changePlayer();
}

function highlightWinningCells() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            break;
        }
    }
}

function announceWinner(player) {
    if (player === "X") {
        statusDisplay.textContent = "🎉 You Win!";
        scores.player++;
        playerScoreDisplay.textContent = scores.player;
    } else {
        statusDisplay.textContent = "🤖 AI Wins!";
        scores.ai++;
        aiScoreDisplay.textContent = scores.ai;
    }
}

function announceDraw() {
    statusDisplay.textContent = "🤝 It's a Draw!";
    scores.draws++;
    drawScoreDisplay.textContent = scores.draws;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "X") {
        statusDisplay.textContent = "Your Turn (X)";
    } else {
        statusDisplay.textContent = "AI is thinking...";
        cells.forEach(cell => cell.classList.add("disabled"));
        setTimeout(aiMove, 600);
    }
}

function aiMove() {
    const bestMove = findBestMove();
    if (bestMove !== -1) {
        updateCell(cells[bestMove], bestMove);
        checkResult();
    }
    cells.forEach(cell => cell.classList.remove("disabled"));
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusDisplay.textContent = "Your Turn (X)";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner", "disabled");
    });
}

function resetScores() {
    scores = { player: 0, ai: 0, draws: 0 };
    playerScoreDisplay.textContent = "0";
    aiScoreDisplay.textContent = "0";
    drawScoreDisplay.textContent = "0";
    resetGame();
}

function changeDifficulty(e) {
    difficulty = e.target.value;
    resetGame();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScores);
difficultySelect.addEventListener("change", changeDifficulty);

createParticles();
