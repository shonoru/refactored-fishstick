# Auto Driving Car Simulation

This Node.js command-line application simulates autonomous cars navigating within a defined rectangular field. Users can specify the field dimensions, add multiple cars with initial positions and directions, assign movement commands, and run simulations to observe the final states of the cars. The program also detects collisions between cars during the simulation.

### Features

- Define a simulation field with customizable width and height.
- Add multiple cars with unique names, starting positions, and facing directions.
- Assign movement commands to each car:

  - L: Rotate 90 degrees to the left.
  - R: Rotate 90 degrees to the right.
  - F: Move forward by one grid point.

- Simulate the movement of all cars, processing commands sequentially.
- Detect and report collisions, halting the movement of involved cars upon impact.

### Installation

Install dependencies:

```
npm install
```

### Usage

1. Start the application

```
npm start
```

2. Follow the on-screen prompts to:

- Enter the field dimensions.
- Add cars by specifying their name, initial position (x, y), and direction (N, S, E, W).
- Assign a sequence of commands (L, R, F) to each car.
- Run the simulation to observe the final positions and statuses of the cars.

### Running Tests

The application includes unit tests for the Car and Simulation class using the Jest framework.

```
npm test
```
