import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as findCarTaskModule from "../../../../src/service-layer/tasks/FindCarTask";
import Car from "../../../../src/domain-layer/entities/Car";
import expect from "expect";

export default class FindCarTaskMock {
  private readonly instanceStub: SinonStubbedInstance<findCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(findCarTaskModule.default);
    this.constructorStub = sandbox.stub(findCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(car: Car): void {
    this.instanceStub.execute.returns(Promise.resolve(car));
  }

  public withExecuteThrowingNotFoundError(): void {
    this.instanceStub.execute.throws(new Error('Car not found.'));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceForCar(carId: number): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toBe(carId);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}
