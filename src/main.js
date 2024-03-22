// Classes
class Player {
    constructor() {
        this.amount = 5;
    }

    currentStatus() {
        console.log(this.amount)
        if (this.amount <= 0) {
            alert('Player lost!');
        }
    }
}

class Computer {
    constructor() {
        this.amount = 5;
    }

    currentStatus() {
        console.log(this.amount)
        if (this.amount <= 0) {
            alert('Computer lost!');
        }
    }
}

class Ship {
    constructor(length, element, side) {
        this.length = length;
        this.lives = length;
        this.element = element;
        this.placed = false;
        this.side = side;
    }

    isSunk() {
        if (this.lives <= 0) {
            return true;
        } else {
            return false;
        }
    }

    hit() {
        if (isPlacedAll()) {
            if(!this.isSunk()) {
                this.lives -= 1;
                console.log('Ship has been hit!');
                if (this.lives === 0) {
                    alert('Ship has been destroyed!');
                    this.side.amount -= 1;
                    this.side.currentStatus();
                }
            } else {
                console.log('The ship is already down');
            }
        } else {
            alert('Place first all the ships!');
        }
    }
}

// Variables

const player = new Player;
const boardSize = 10;

// QuerySelectors
const cells = document.querySelectorAll('.cell');
const twoShip = new Ship(2, document.querySelector('.two-ship'), player);
const firstThreeShip = new Ship(3, document.querySelector('.three-one-ship'), player);
const secondThreeShip = new Ship(3, document.querySelector('.three-two-ship'), player);
const fourShip = new Ship(4, document.querySelector('.four-ship'), player);
const fiveShip = new Ship(5, document.querySelector('.five-ship'), player);


// Events

twoShip.element.addEventListener('click', () => {
    twoShip.hit()
})

twoShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'two-ship');
})
 
firstThreeShip.element.addEventListener('click', () => {
    firstThreeShip.hit()
})

firstThreeShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'three-one-ship');
})
 
secondThreeShip.element.addEventListener('click', () => {
    secondThreeShip.hit()
})

secondThreeShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'three-two-ship');
})
 
fourShip.element.addEventListener('click', () => {
    fourShip.hit()
})

fourShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'four-ship');
})
 
fiveShip.element.addEventListener('click', () => {
    fiveShip.hit()
})

fiveShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'five-ship');
})
 



// Functions

cells.forEach(cell => {
    cell.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    cell.addEventListener('drop', (event) => {
        console.log(event)
    })
})

//

const gameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

// Function to place a ship on the game board
function placeShip(ship, cellX, cellY) {
    const shipLength = ship.length;

    // Check if the ship can be placed in the specified position
    if (isValidPlacement(shipLength, cellX, cellY)) {
        // Update the game board with the ship's position
        for (let i = 0; i < shipLength; i++) {
            gameBoard[cellY][cellX + i] = ship;
        }
        ship.placed = true;
        isPlacedAll();
        console.log('Ship placed on the board:', ship);
        // Update the CSS position of the ship element to match the dropped cell position
        const cellRect = event.target.getBoundingClientRect();
        ship.element.style.position = 'absolute';
        ship.element.style.left = cellRect.left + 'px';
        ship.element.style.top = cellRect.top + 'px';
    } else {
        console.log('Invalid ship placement');
    }
}

// Function to check if a ship can be placed in a specific position
function isValidPlacement(shipLength, cellX, cellY) {
    if (cellX + shipLength > boardSize) {
        return false;
    }

    for (let i = 0; i < shipLength; i++) {
        if (gameBoard[cellY][cellX + i] !== null) {
            return false;
        }
    }
    return true;
}

// Event handler for dropping a ship onto the game board
function drop(event) {
    event.preventDefault();

    const isStatement = event.dataTransfer.getData('is-ship');
    const data = event.dataTransfer.getData('ship-type');

    if (isStatement) {
        const cellX = parseInt(event.target.dataset.x);
        const cellY = parseInt(event.target.dataset.y);

        switch (data) {
            case "two-ship":
                placeShip(twoShip, cellX, cellY);
                break;
            case "three-one-ship":
                placeShip(firstThreeShip, cellX, cellY);
                break;
            case "three-two-ship":
                placeShip(secondThreeShip, cellX, cellY);
                break;
            case "four-ship":
                placeShip(fourShip, cellX, cellY);
                break;
            case "five-ship":
                placeShip(fiveShip, cellX, cellY);
                break;
        }

    }
}

cells.forEach(cell => {
    cell.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    cell.addEventListener('drop', drop);
})

function isPlacedAll() {
    if (twoShip.placed === true && 
        firstThreeShip.placed === true && 
        secondThreeShip.placed === true && 
        fourShip.placed === true && 
        fiveShip.placed === true
    ) {
        return true;
    } else {
        return false;
    }
}
