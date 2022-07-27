import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Car from "../../../src/domain-layer/entities/Car";
import UpdateCarTask, {UpdateCarData} from "../../../src/service-layer/tasks/UpdateCarTask";
import FindCarTaskMock from "../controllers/test-doubles/FindCarTaskMock";
import expect from "expect";

describe('UpdateCarTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;
  let findCarTaskMock: FindCarTaskMock;

  const carData: UpdateCarData = { id: 1, model: 'Sorento', brand: 'KIA', year: 2021 };
  const expectedCar = new Car(carData.id, carData.model, carData.brand, carData.year);

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
    findCarTaskMock = new FindCarTaskMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should update a car', async () => {
    findCarTaskMock.withExecuteReturning(expectedCar);
    databaseConnectionMock.withSaveReturningEntity(expectedCar);

    const task = new UpdateCarTask(carData);
    const car = await task.execute();

    expect(car).toEqual(expectedCar);
  })
});
