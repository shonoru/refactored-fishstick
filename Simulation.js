const readline = require('readline');
const {Car} = require('./Car');

/**
 * Checks if the car collides with any other car and updates collision data.
 */
function checkCollision(cars, currentCar, step) {
    for (const otherCar of cars) {
      if (
        otherCar !== currentCar && currentCar.x == otherCar.x &&  currentCar.y == otherCar.y
      ) {
        currentCar.active = false;
        otherCar.active = false;

        currentCar.collidedWith.push(otherCar.name);
        otherCar.collidedWith.push(currentCar.name);

        currentCar.collidedAt = step;
        otherCar.collidedAt = step;
      }
    }
  }

  
class Simulation {
    constructor() {
        this.fieldWidth = 0;
        this.fieldHeight = 0;
        this.cars = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    prompt(query) {
        return new Promise(resolve => this.rl.question(query, resolve));
    }

    async setupField() {
        const input = await this.prompt("Please enter the width and height of the simulation field in x y format:\n");
        const [width, height] = input.split(' ').map(Number);
        this.fieldWidth = width;
        this.fieldHeight = height;
        console.log(`You have created a field of ${width} x ${height}.\n`);
    }

    async removeCars() {
        this.cars = []
    }

    async addCar() {
        const name = await this.prompt("Please enter the name of the car:\n");
        const position = await this.prompt("Please enter initial position of car A in x y Direction format:\n");
        const [x, y, direction] = position.split(' ');
        if (!['N', 'S', 'E', 'W'].includes(direction)) {
            console.log("Invalid direction. Use N, S, E, or W.");
            return;
        }
        const commands = await this.prompt(`Please enter the commands for car ${name}:\n`);
        this.cars.push(new Car(name, x, y, direction, commands));
        this.displayCars()
    }

    async displayCars() {
        console.log('\nYour current list of cars are:\n')
        for (const car of this.cars) {
            console.log(`- ${car.toStringWithCommands()}`);
        }
    }

    async runSimulation() {
        this.displayCars();

        const maxCommandsLength = Math.max(...this.cars.map((car) => car.commands.length))
        for (let step = 0; step < maxCommandsLength; step++) {
            for (let i = 0; i < this.cars.length; i++) {
                const car = this.cars[i];
                const command = car.commands[step];
                // Skip move if car is collided or no move exists
                if (!car.active || !command) continue;
                
                // Execute move
                car.executeCommand(command, this.fieldWidth, this.fieldHeight);
                
                // Check for collision after the move
                checkCollision(this.cars, car, step + 1);
            }
        }

        console.log("\nAfter simulation, the result is:\n");
        for (const car of this.cars) {
            if (car.active) {
                console.log(`- ${car.toString()}`);    
            } else {
                console.log(`- ${car.toStringCollision()}`);
            }
            
        }
    }

    async mainMenu() {
        let running = true;
        let isStartOver = false;

        while (running) {

            if (isStartOver) {
                console.log("[1] Start over");
                console.log("[2] Exit");    
                const choice = await this.prompt("\nEnter your choice: ");
                if (choice === '1') {
                    isStartOver = false;
                    await this.removeCars()
                    await this.setupField()
                    
                } else if (choice === '2') {
                    console.log("Thank you for running the simulation. Goodbye!");
                    this.rl.close();
                    running = false;
                } else {
                    console.log("Invalid choice. Please try again.");
                }
            } else {
                console.log("\nPlease choose from the following options:");
                console.log("[1] Add a car to field");
                console.log("[2] Run simulation");
                console.log("[3] Exit");
                const choice = await this.prompt("");
        
                if (choice === '1') {
                    await this.addCar();
                } else if (choice === '2') {
                    if (this.cars.length === 0) {
                        console.log("No cars available to run the simulation. Please add a car first.");
                    } else {
                        await this.runSimulation();
                        isStartOver = true
                        console.log("\nSimulation completed. Returning to menu.");
                    }                    
                } else if (choice === '3') {
                    console.log("Thank you for running the simulation. Goodbye!");
                    this.rl.close();
                    running = false;
                } else {
                    console.log("Invalid choice. Please try again.");
                }    
            }
        }
    }
}

module.exports = {Simulation}
