const state = {
    gameStart: false
}

class Ship {
    constructor(length, element, side, name) {
        this.length = length;
        this.lives = length;
        this.element = element;
        this.placed = false;
        this.side = side;
        this.text = this.lives;
        this.name = name;
    }

    isSunk() {
        if (this.lives <= 0) {
            return true;
        } else {
            return false;
        }
    }

    hit() {
        if (state.gameStart) {
            if(!this.isSunk()) {
                this.lives -= 1;
                playerInfo.textContent = `${this.name} has been hit!`
                if (this.lives === 0) {
                    playerInfo.textContent = `${this.name} has been destroyed!`
                    this.side.amount -= 1;
                    this.side.currentStatus();
                }
            } else {
                console.log('This ship is already down');
            }
        }
    }
}

class ComputerShip {
    constructor(length, side, name) {
        this.length = length;
        this.lives = length;
        this.placed = false;
        this.side = side;
        this.name = name;
    }

    isSunk() {
        if (this.lives <= 0) {
            return true;
        } else {
            return false;
        }
    }

    hit() {
        console.log('invoked')
            if(!this.isSunk()) {
                this.lives -= 1;
                computerInfo.textContent = `${this.name} has been hit!`;
                if (this.lives === 0) {
                    computerInfo.textContent = `${this.name} has been destroyed!`;
                    this.side.amount -= 1;
                    this.side.currentStatus();
                }
            } else {
                console.log('This ship is already down');
            }
        }
}

// Classes
class Player {
    constructor() {
        this.amount = 5;
    }

    currentStatus() {
        console.log(this.amount)
        if (this.amount <= 0) {
            mainInfo.textContent = 'Player won!'
            state.gameStart = false;
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
            mainInfo.textContent = 'Player won!';
            state.gameStart = false;
        }
    }
}

// Variables

const player = new Player;
const computer = new Computer;
const boardSize = 10;


// QuerySelectors
const cells = document.querySelectorAll('.cell');
const enemyCells = document.querySelectorAll('.c-cell');
const twoShip = new Ship(2, document.querySelector('.two-ship'), player, "Twoship");
const firstThreeShip = new Ship(3, document.querySelector('.three-one-ship'), player, "Threeship");
const secondThreeShip = new Ship(3, document.querySelector('.three-two-ship'), player, "Threeship");
const fourShip = new Ship(4, document.querySelector('.four-ship'), player, "Fourship");
const fiveShip = new Ship(5, document.querySelector('.five-ship'), player, "Fiveship");

const mainInfo = document.querySelector('#main-info');
const playerInfo = document.querySelector('#player-info');
const computerInfo = document.querySelector('#computer-info');

// Events

twoShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'two-ship');
})

firstThreeShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'three-one-ship');
})

secondThreeShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'three-two-ship');
})

fourShip.element.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('is-ship', true);
    event.dataTransfer.setData('ship-type', 'four-ship');
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



const ComputergameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
const PlayergameBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

function placeShip(ship, cellX, cellY) {
    if (state.gameStart) {
        return;
    }
    const shipLength = ship.length;

    if (isValidPlacement(shipLength, cellX, cellY)) {
        for (let i = 0; i < shipLength; i++) {
            PlayergameBoard[cellY][cellX + i] = ship;
        }
        ship.placed = true;
        if (isPlacedAll()) {
            state.gameStart = true;
            console.log(state.gameStart)
        }
        console.log('Ship placed on the board:', cellY, cellX);
        const cellRect = event.target.getBoundingClientRect();
        ship.element.style.position = 'absolute';
        ship.element.style.left = cellRect.left + 'px';
        ship.element.style.top = cellRect.top + 'px';
    } else {
        console.log('Invalid ship placement');
        console.log(cellX, ship.length);
    }
}

function isValidPlacement(shipLength, cellX, cellY) {
    if (state.gameStart) {
        return;
    }
    if (cellX + shipLength > boardSize) {
        return false;
    }

    for (let i = 0; i < shipLength; i++) {
        if (PlayergameBoard[cellY][cellX + i] !== null) {
            return false;
        }
    }
    return true;
}

function drop(event) {
    event.preventDefault();

    if (state.gameStart) {
        return;
    }

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

function computerAttack() {
    let xCom = Math.floor(Math.random()*100)
    if (!cells[xCom].attacked) {
        cells[xCom].attacked = true;
        cells[xCom].style.backgroundColor = "rgb(0, 0, 0, 0.5)";
        console.log(cells[xCom])
        if (PlayergameBoard[cells[xCom].dataset.y][cells[xCom].dataset.x]) {
            console.log(PlayergameBoard[cells[xCom].dataset.y][cells[xCom].dataset.x]);
            PlayergameBoard[cells[xCom].dataset.y][cells[xCom].dataset.x].hit();
            let text = parseInt(PlayergameBoard[cells[xCom].dataset.y][cells[xCom].dataset.x].element.textContent);
            text -= 1
            PlayergameBoard[cells[xCom].dataset.y][cells[xCom].dataset.x].element.textContent = text;

        }
    } else {
        computerAttack()
    }

}

function computerPlace(amount, name) {
    let xCom = Math.floor(Math.random() * enemyCells.length);
    let compY = parseInt(enemyCells[xCom].dataset.y);
    let compX = Math.floor(Math.random() * (boardSize - amount + 1))
    let newShip = new ComputerShip(amount, computer, name);
    if (isValidPlacement(amount, compX, compY)) {
        computerSet(newShip, xCom, compY, compX);
    } else {
        console.log('Invalid ship placement');
        computerPlace(amount, name);
    }
}

function computerSet(news, xCom, compY, compX) {
    for (let i = 0; i < news.length; i++) {
        ComputergameBoard[compY][compX + i] = news;
        ComputergameBoard[compY][compX + i].has = news
    }
    news.placed = true;
    enemyCells[xCom].placed = true;
    if (isPlacedAll()) {
        state.gameStart = true;
    }
    console.log('Ship placed on the board:', compY, compX);
    console.log(enemyCells[xCom])
    console.log(ComputergameBoard)
}

computerPlace(2, "Twoship")
computerPlace(3, "Threeship")
computerPlace(3, "Threeship")
computerPlace(4, "Fourship")
computerPlace(5, "Fiveship")

enemyCells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (state.gameStart) {
            if (!cell.attacked) {
                cell.attacked = true;
                cell.style.backgroundColor = 'rgb(0, 0, 0, 0.5)'
                if (ComputergameBoard[cell.dataset.y][cell.dataset.x]) {
                    console.log(ComputergameBoard[cell.dataset.y][cell.dataset.x])
                    ComputergameBoard[cell.dataset.y][cell.dataset.x].hit();
                }
                computerAttack();
            }
        }
    })
})