import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import expect from "expect";
import Car from "../../../../src/domain-layer/entities/Car";
import { AddCarData } from "../../../../src/service-layer/tasks/AddCarTask";
import * as addCarTaskModule from "../../../../src/service-layer/tasks/AddCarTask";

export default class AddCarTaskMock {
    private readonly instanceStub: SinonStubbedInstance<addCarTaskModule.default>;

    private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(addCarTaskModule.default);
    this.constructorStub = sandbox.stub(addCarTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(car: Car): void {
    this.instanceStub.execute.returns(Promise.resolve(car));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceWithCarData(carData: AddCarData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(carData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}