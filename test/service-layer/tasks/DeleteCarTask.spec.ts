import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import DeleteCarTask from "../../../src/service-layer/tasks/DeleteCarTask";
import Car from "../../../src/domain-layer/entities/Car";
import expect from 'expect'

describe('DeleteCarTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const carId = 1;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete a car', async () => {
    databaseConnectionMock.withDeleteSucceeding();

    const task = new DeleteCarTask(carId);
    await task.execute();

    databaseConnectionMock.expectGotRepositoryOf(Car);
    databaseConnectionMock.expectDeleteCalledOnceWith(carId);
  });

  it('should throw "No more Cars to delete in the DB." if there\'s no more cars', async () => {
    databaseConnectionMock.withFindOneByReturningEntity(null);

    const task = new DeleteCarTask(carId);
    await expect(task.executeFind()).rejects.toThrow('No more Cars to delete in the DB.');

    databaseConnectionMock.expectGotRepositoryOf(Car);
    databaseConnectionMock.expectFindOneByCalledOnceWith({ id: carId });
  });
});
