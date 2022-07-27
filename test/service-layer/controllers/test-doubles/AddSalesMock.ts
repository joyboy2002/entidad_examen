import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import expect from "expect";
import Sales from "../../../../src/domain-layer/entities/Sales";
import { AddSalesData } from "../../../../src/service-layer/tasks/AddSales";
import * as addSalesTaskModule from "../../../../src/service-layer/tasks/AddSales";

export default class AddCarTaskMock {
    private readonly instanceStub: SinonStubbedInstance<addSalesTaskModule.default>;

    private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(addSalesTaskModule.default);
    this.constructorStub = sandbox.stub(addSalesTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(sales: Sales): void {
    this.instanceStub.execute.returns(Promise.resolve(sales));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceWithCarData(salesData: AddSalesData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(salesData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}