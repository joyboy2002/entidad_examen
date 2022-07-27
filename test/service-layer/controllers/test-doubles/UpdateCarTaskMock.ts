import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as updateCarTaskModule from "../../../../src/service-layer/tasks/UpdateCarTask";
import Car from "../../../../src/domain-layer/entities/Car";
import expect from "expect";
import {UpdateCarData} from "../../../../src/service-layer/tasks/UpdateCarTask";

export default class UpdateCarTaskMock {
  private readonly instanceStub: SinonStubbedInstance<updateCarTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(updateCarTaskModule.default);
    this.constructorStub = sandbox.stub(updateCarTaskModule, 'default');
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

  public expectExecuteWasCalledOnceWithCarData(carData: UpdateCarData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(carData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}
