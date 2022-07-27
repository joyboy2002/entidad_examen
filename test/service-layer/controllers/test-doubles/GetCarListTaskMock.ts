import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as getCarListTaskModule from "../../../../src/service-layer/tasks/GetCarListTask";
import Car from "../../../../src/domain-layer/entities/Car";
import expect from "expect";

export default class GetCarListTaskMock {
  private readonly instanceStub: SinonStubbedInstance<getCarListTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(getCarListTaskModule.default);
    this.constructorStub = sandbox.stub(getCarListTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(cars: Car[]): void {
    this.instanceStub.execute.returns(Promise.resolve(cars));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnce(): void {
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}
