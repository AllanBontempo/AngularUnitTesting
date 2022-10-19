import {CalculatorService} from './calculator.service';
import {LoggerService} from './logger.service';
import createSpyObj = jasmine.createSpyObj;
import {TestBed} from '@angular/core/testing';

let calculator: CalculatorService;
let loggerSpy: any;

describe('CalculatorService', () => {

  beforeEach(() => {
    loggerSpy = createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.inject<CalculatorService>(CalculatorService);

  });

  it('should add two numbers', () => {
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0,'unexpected subtraction result');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
})
