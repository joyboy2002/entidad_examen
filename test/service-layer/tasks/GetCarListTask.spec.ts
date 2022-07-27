import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Car from "../../../src/domain-layer/entities/Car";
import GetCarListTask from "../../../src/service-layer/tasks/GetCarListTask";
import expect from "expect";

describe('GetCarListTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const carId = 1;
  const expectedCarsList: Car[] = [
    new Car(1, 'Sorento', 'KIA', 2021),
    new Car(2, 'XC40', 'Volvo', 2022),
    new Car(3, 'Jetta', 'Volkswagen', 2019),
  ];

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a list of cars', async () => {
    databaseConnectionMock.withFindReturningListOfEntities(expectedCarsList);

    const task = new GetCarListTask();
    const carsList = await task.execute();

    expect(carsList).toEqual(expectedCarsList);
    databaseConnectionMock.expectGotRepositoryOf(Car);
    databaseConnectionMock.expectFindCalledOnce();
  });
});
