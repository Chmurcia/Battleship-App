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
        if (gameStart) {
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
        }
    }
}

export { Ship };