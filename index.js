const {Simulation} = require('./Simulation');

(async () => {
    console.log("Welcome to Auto Driving Car Simulation!");
    const simulation = new Simulation();
    await simulation.setupField();
    await simulation.mainMenu();
})();

