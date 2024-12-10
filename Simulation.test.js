const { Simulation } = require('./Simulation');
const { Car } = require('./Car'); 

jest.mock('readline');

describe('Simulation', () => {
    let simulation;

    beforeEach(() => {
        simulation = new Simulation();
        simulation.prompt = jest.fn(); // Mock the prompt method
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should setup the field correctly', async () => {
        simulation.prompt.mockResolvedValueOnce('10 10');
        await simulation.setupField();
        expect(simulation.fieldWidth).toBe(10);
        expect(simulation.fieldHeight).toBe(10);
    });

    test('should add a car correctly', async () => {
        simulation.prompt
            .mockResolvedValueOnce('A')
            .mockResolvedValueOnce('1 1 N')
            .mockResolvedValueOnce('FFRF');
        
        await simulation.addCar();

        expect(simulation.cars.length).toBe(1);
        expect(simulation.cars[0]).toEqual(
            expect.objectContaining({
                name: 'A',
                x: 1,
                y: 1,
                direction: 'N',
                commands: ['F', 'F', 'R', 'F'],
            })
        );
    });

    test('should detect a collision between two cars', async () => {
        // Setup the field
        simulation.fieldWidth = 5;
        simulation.fieldHeight = 5;

        // Add cars
        simulation.cars.push(
            new Car('A', 1, 1, 'N', 'FFF'),
            new Car('B', 1, 4, 'S', 'FFF')
        );

        // Run simulation
        await simulation.runSimulation();

        expect(simulation.cars[0].active).toBe(false);
        expect(simulation.cars[1].active).toBe(false);

        expect(simulation.cars[0].collidedWith).toContain('B');
        expect(simulation.cars[1].collidedWith).toContain('A');
    });

    test('should execute simulation commands correctly', async () => {
        // Setup the field
        simulation.fieldWidth = 5;
        simulation.fieldHeight = 5;

        // Add a single car 
        simulation.cars.push(new Car('A', 1, 1, 'N', 'FRF'));
        expect(simulation.cars.length).toEqual(1)

        // Run simulation
        await simulation.runSimulation();

        const car = simulation.cars[0];
        expect(car.active).toBe(true);
        expect(car.x).toBe(2);
        expect(car.y).toBe(2);
        expect(car.direction).toBe('E');
    });

    test('should reset cars on start over', async () => {
        simulation.cars.push(new Car('A', 1, 1, 'N', ''));
        await simulation.removeCars();
        expect(simulation.cars.length).toBe(0);
    });
});
