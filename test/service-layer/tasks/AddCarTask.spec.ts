import sinon from 'sinon';
import Car from '../../../src/domain-layer/entities/Car';
import AddCarTask, {AddCarData} from '../../../src/service-layer/tasks/AddCarTask';
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import expect from "expect";

describe('AddCarTask tests', () => {
    let sandbox: sinon.SinonSandbox;
    let databaseConnectionMock: DatabaseConnectionMock;
  
    const carData: AddCarData = { model: 'Sorento', brand: 'KIA', year: 2021 };
    const expectedCar = new Car(1, carData.model, carData.brand, carData.year);

    before(() => {
        sandbox = sinon.createSandbox();
      });
    
      beforeEach(() => {
        databaseConnectionMock = new DatabaseConnectionMock(sandbox);
      })
    
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should add a car to the DB', async () => {
        databaseConnectionMock.withSaveReturningEntity(expectedCar);
    
        const task = new AddCarTask(carData);
        const car = await task.execute();
    
        expect(car).toEqual(expectedCar);
        databaseConnectionMock.expectGotRepositoryOf(Car);
        databaseConnectionMock.expectSaveCalledOnceWith(carData);
      });
    });
    
