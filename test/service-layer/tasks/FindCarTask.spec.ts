import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Car from "../../../src/domain-layer/entities/Car";
import FindCarTask from "../../../src/service-layer/tasks/FindCarTask";
import expect from "expect";

describe('FindCarTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const carId = 1;
  const expectedCar = new Car(carId, 'Sorento', 'KIA', 2021);

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should find a car', async () => {
    databaseConnectionMock.withFindOneByReturningEntity(expectedCar);

    const task = new FindCarTask(carId);
    const car = await task.execute();

    expect(car).toEqual(expectedCar);
    databaseConnectionMock.expectGotRepositoryOf(Car);
    databaseConnectionMock.expectFindOneByCalledOnceWith({ id: carId });
  });

  it('should throw "Car not found." if car doesn\'t exist', async () => {
    databaseConnectionMock.withFindOneByReturningEntity(null);

    const task = new FindCarTask(carId);
    await expect(task.execute()).rejects.toThrow('Car not found.');

    databaseConnectionMock.expectGotRepositoryOf(Car);
    databaseConnectionMock.expectFindOneByCalledOnceWith({ id: carId });
  });
});
