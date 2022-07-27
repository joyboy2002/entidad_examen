import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as deleteCarTaskModule from "../../../../src/service-layer/tasks/DeleteCarTask";
import expect from "expect";

export default class DeleteCarTaskMock {
  private readonly instanceStub: SinonStubbedInstance<deleteCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(deleteCarTaskModule.default);
    this.constructorStub = sandbox.stub(deleteCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteSucceeding(): void {
    this.instanceStub.execute.returns(Promise.resolve());
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
