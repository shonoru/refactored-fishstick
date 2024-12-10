class Car {
    static DIRECTIONS = ['N', 'E', 'S', 'W']; // clockwise directions to use in rotate func

    constructor(name, x, y, direction, commands) {
        this.name = name;
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.direction = direction;
        this.commands = commands.split('');
        this.active = true;
        this.collidedWith = [];
        this.collidedAt = 0;
    }

    rotate(command) {
        const currentIndex = Car.DIRECTIONS.indexOf(this.direction);
        if (command === 'L') {
            this.direction = Car.DIRECTIONS[(currentIndex + 3) % 4];
        } else if (command === 'R') {
            this.direction = Car.DIRECTIONS[(currentIndex + 1) % 4];
        }
    }

    moveForward(fieldWidth, fieldHeight) {
        if (this.direction === 'N' && this.y + 1 < fieldHeight) this.y++;
        else if (this.direction === 'S' && this.y - 1 >= 0) this.y--;
        else if (this.direction === 'E' && this.x + 1 < fieldWidth) this.x++;
        else if (this.direction === 'W' && this.x - 1 >= 0) this.x--;
    }

    executeCommand(command, fieldWidth, fieldHeight) {
        if (command === 'L' || command === 'R') {
            this.rotate(command);
        } else if (command === 'F') {
            this.moveForward(fieldWidth, fieldHeight);
        }
    }

    toString() {
        return `${this.name}, (${this.x},${this.y}) ${this.direction}`;
    }
    
    toStringWithCommands() {
        return `${this.name}, (${this.x},${this.y}) ${this.direction} ${this.commands.join('')}`;
    }
    
    toStringCollision() {
        return `${this.name}, collides with ${this.collidedWith} at (${this.x},${this.y}) at step ${this.collidedAt}`;
    }
}

module.exports = {Car}
