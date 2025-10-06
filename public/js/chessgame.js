const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

// UI Elements
const newGameBtn = document.getElementById('newGameBtn');
const flipBoardBtn = document.getElementById('flipBoardBtn');
const gameMessage = document.getElementById('gameMessage');

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add('square', (rowindex + squareindex) % 2 === 0 ? 'light' : 'dark');
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece', square.color === 'w' ? 'white' : 'black');
                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        pieceElement.classList.add('dragging');
                        e.dataTransfer.setData('text/plain', '');
                    }
                });

                pieceElement.addEventListener('dragend', () => {
                    pieceElement.classList.remove('dragging');
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if (draggedPiece && sourceSquare) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const getPieceUnicode = (piece) => {
    const pieces = {
        'w': { 'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙' },
        'b': { 'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟' }
    };
    return pieces[piece.color][piece.type];
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q',
    };

    // Validate move locally first
    const tempChess = new Chess(chess.fen());
    const moveResult = tempChess.move(move);
    
    if (moveResult) {
        socket.emit('move', move);
        showGameMessage('Move sent!', 'success');
    } else {
        showGameMessage('Invalid move!', 'error');
    }
};

const showGameMessage = (message, type) => {
    if (gameMessage) {
        gameMessage.textContent = message;
        gameMessage.className = `text-lg font-medium ${
            type === 'success' ? 'text-green-400' : 
            type === 'error' ? 'text-red-400' : 
            'text-white'
        }`;
        
        // Auto-clear message after 3 seconds
        setTimeout(() => {
            if (gameMessage) {
                gameMessage.textContent = chess.isGameOver() ? 'Game Over' : `${chess.turn() === 'w' ? 'White' : 'Black'} to move`;
                gameMessage.className = 'text-white text-lg font-medium';
            }
        }, 3000);
    }
};

const startNewGame = () => {
    chess.reset();
    showGameMessage('New game started!', 'success');
    socket.emit('newGame');
    renderBoard();
};

const flipBoard = () => {
    boardElement.classList.toggle('flipped');
    showGameMessage('Board flipped!', 'info');
};

// Event Listeners
if (newGameBtn) {
    newGameBtn.addEventListener('click', startNewGame);
}

if (flipBoardBtn) {
    flipBoardBtn.addEventListener('click', flipBoard);
}

// Socket Events
socket.on('playerRole', (role) => {
    playerRole = role;
    showGameMessage(`You are playing as ${role === 'w' ? 'White' : 'Black'}`, 'info');
    renderBoard();
});

socket.on('spectatorRole', () => {
    playerRole = null;
    showGameMessage('You are spectating the game', 'info');
    renderBoard();
});

socket.on('boardState', (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on('move', (move) => {
    const moveResult = chess.move(move);
    if (moveResult) {
        showGameMessage(`${moveResult.color === 'w' ? 'White' : 'Black'} moved ${moveResult.san}`, 'info');
    }
    renderBoard();
});

socket.on('invalidMove', (move) => {
    showGameMessage('Invalid move!', 'error');
});

socket.on('newGame', () => {
    chess.reset();
    showGameMessage('New game started!', 'success');
    renderBoard();
});

socket.on('connect', () => {
    showGameMessage('Connected to server!', 'success');
});

socket.on('disconnect', () => {
    showGameMessage('Connection lost!', 'error');
});

// Initialize the game
renderBoard();