const {Car} = require('./Car');

describe('Car', () => {
    let car;

    beforeEach(() => {
        car = new Car('A', 1, 2, 'N', ''); 
    });

    test('should initialize with correct properties', () => {
        expect(car.name).toBe('A');
        expect(car.x).toBe(1);
        expect(car.y).toBe(2);
        expect(car.direction).toBe('N');
        expect(car.active).toBe(true);
    });

    test('should turn left correctly', () => {
        car.executeCommand('L');
        expect(car.direction).toBe('W');
        car.executeCommand('L');
        expect(car.direction).toBe('S');
        car.executeCommand('L');
        expect(car.direction).toBe('E');
        car.executeCommand('L');
        expect(car.direction).toBe('N');
    });

    test('should turn right correctly', () => {
        car.executeCommand('R');
        expect(car.direction).toBe('E');
        car.executeCommand('R');
        expect(car.direction).toBe('S');
        car.executeCommand('R');
        expect(car.direction).toBe('W');
        car.executeCommand('R');
        expect(car.direction).toBe('N');
    });

    test('should move forward correctly within boundaries', () => {
        car.executeCommand('F', 10, 10);
        expect(car.x).toBe(1);
        expect(car.y).toBe(3); 
    });

    test('should not move outside the boundaries', () => {
        car.y = 9;
        car.executeCommand('F', 10, 10);
        expect(car.y).toBe(9);

        car.direction = 'S';
        car.y = 0;
        car.executeCommand('F', 10, 10);
        expect(car.y).toBe(0);

        car.direction = 'E';
        car.x = 9;
        car.executeCommand('F', 10, 10);
        expect(car.x).toBe(9);

        car.direction = 'W';
        car.x = 0;
        car.executeCommand('F', 10, 10);
        expect(car.x).toBe(0);
    });

    test('should execute multiple commands correctly', () => {
        car.commands = ['F', 'F', 'R', 'F', 'F', 'L'];
        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.x).toBe(1);
        expect(car.y).toBe(3);

        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.y).toBe(4);

        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.direction).toBe('E');

        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.x).toBe(2);

        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.x).toBe(3);

        car.executeCommand(car.commands.shift(), 10, 10);
        expect(car.direction).toBe('N');
    });

    test('toString method should return correct representation', () => {
        expect(car.toString()).toBe('A, (1,2) N');
        car.x = 5;
        car.y = 5;
        car.direction = 'S';
        expect(car.toString()).toBe('A, (5,5) S');
    });
});
