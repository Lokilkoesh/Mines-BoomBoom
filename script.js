let gridSize;
let mines = [];
let revealedCount = 0;

function startGame(size) {
    gridSize = size;
    resetGame();
    const grid = document.getElementById('grid');
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.innerHTML = '';

    // Initialize the grid
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.onclick = () => revealCell(cell, i);
        grid.appendChild(cell);
    }

    // Place mines
    placeMines(size);

    document.getElementById('game').style.display = 'block';
}

function resetGame() {
    mines = [];
    revealedCount = 0;
    document.getElementById('game').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

function restartGame() {
    const selectedSize = gridSize; // Keep the selected size
    resetGame();
    startGame(selectedSize);
}

function placeMines(size) {
    const mineCount = Math.floor(size * size * 0.2); // 20% of the grid will have mines
    while (mines.length < mineCount) {
        const randomIndex = Math.floor(Math.random() * (size * size));
        if (!mines.includes(randomIndex)) {
            mines.push(randomIndex);
        }
    }
}

function revealCell(cell, index) {
    if (cell.classList.contains('revealed')) return;

    cell.classList.add('revealed');
    revealedCount++;

    if (mines.includes(index)) {
        cell.classList.add('mine');
        showModal(); // Show the Game Over modal
    } else {
        cell.classList.add('safe');
    }

    // Check for win condition
    if (revealedCount === (gridSize * gridSize - mines.length)) {
        alert('Congratulations! You cleared the field!');
        resetGame();
    }
}

function showModal() {
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
