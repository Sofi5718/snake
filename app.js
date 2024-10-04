"use strict";
import { Queue } from "./queue.js";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

const grid_rows = 20;
const grid_cols = 30;
let isGameOver = false;
let tickTimeoutId;

function start() {
    console.log(`Javascript kører`);
    document.addEventListener("keydown", handleKeyPress);
    createSnake();
    initModel(grid_rows, grid_cols);
    createBoard();

    // start ticking
    tick();
}

function tick() {
    // setup next tick
    if (!isGameOver) {
        tickTimeoutId = setTimeout(tick, 2000);
    }

    // TODO: Do stuff
    let currentSnakeBodyPart = snake.head;
    const head = {
        row: snake.tail.data.row,
        col: snake.tail.data.col,
    };
    while (currentSnakeBodyPart != null) {
        writeToCell(currentSnakeBodyPart.data.row, currentSnakeBodyPart.data.col, 0);
        currentSnakeBodyPart.next;
    }
    moveSnake(head);
    snake.enQueue(head);
    snake.deQueue();
    currentSnakeBodyPart = snake.head;

    while (currentSnakeBodyPart) {
        writeToCell(currentSnakeBodyPart.data.row, currentSnakeBodyPart.data.col, 1);
        currentSnakeBodyPart.next;
    }

    // display the model in full
    displayBoard();
    if (isGameOver) {
        clearTimeout(tickTimeoutId);
        stopGame();
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            dicrection = "up";
            break;
        case "ArrowDown":
            dicrection = "down";
            break;
        case "ArrowLeft":
            dicrection = "left";
            break;
        case "ArrowRight":
            dicrection = "right";
            break;
    }
}

// #endregion controller

// ****** MODEL ******
// #region model
let snake;
let dicrection = "right";

function createSnake() {
    let newSnake = new Queue();
    newSnake.enQueue({
        row: Math.floor(grid_rows / 2),
        col: Math.floor(grid_cols / 2),
    });
    newSnake.enQueue({
        row: Math.floor(grid_rows / 2),
        col: Math.floor(grid_cols / 2) - 1,
    });
    newSnake.enQueue({
        row: Math.floor(grid_rows / 2),
        col: Math.floor(grid_cols / 2) - 2,
    });
    snake = newSnake;
}

function moveSnake(head) {
    switch (dicrection) {
        case "up":
            {
                head.row--;
                if (head.row < 0) {
                    isGameOver = true;
                    //clearTimeout(tick);
                }
            }
            break;
        case "down":
            {
                head.row++;
                if (head.row > grid_rows - 1) {
                    isGameOver = true;
                }
            }
            break;
        case "right":
            {
                head.col++;
                if (head.col > grid_cols - 1) {
                    isGameOver = true;
                }
            }
            break;
        case "left":
            {
                head.col--;
                if (head.col < 0) {
                    isGameOver = true;
                }
            }
            break;
    }
}

let model;

function initModel(rows, cols) {
    const newGrid = Array(rows);
    for (let row = 0; row < newGrid.length; row++) {
        newGrid[row] = Array(cols).fill(0);
    }
    model = newGrid;
}

function writeToCell(row, col, value) {
    model[row][col] = value;
}

function readFromCell(row, col) {
    return model[row][col];
}

// #endregion model

// ****** VIEW ******
// #region view
function createBoard() {
    const grid = document.querySelector("#grid");
    grid.style.setProperty("--grid_colums", grid_cols);

    for (let row = 0; row < grid_rows; row++) {
        for (let col = 0; col < grid_cols; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            grid.appendChild(cell);
        }
    }
}

function displayBoard() {
    const cells = document.querySelectorAll("#grid .cell");
    for (let row = 0; row < grid_rows; row++) {
        for (let col = 0; col < grid_cols; col++) {
            const index = row * grid_cols + col;

            switch (readFromCell(row, col)) {
                case 0:
                    cells[index].classList.remove("player", "goal");
                    break;
                case 1: // Note: doesn't remove goal if previously set
                    cells[index].classList.add("player");
                    break;
                case 2: // Note: doesn't remove player if previously set
                    cells[index].classList.add("goal");
                    break;
            }
        }
    }
}

function stopGame() {}

// #endregion view
