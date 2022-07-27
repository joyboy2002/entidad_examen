import Sales from '../../domain-layer/entities/Sales';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import FindCarTask from './FindCarTask';
import IAsyncTask from './IAsyncTask';

export type AddSalesData = {
  carId: number;
  price: number;
};

export default class AddSales implements IAsyncTask<Sales> {
  private addSalesData: AddSalesData;

  public constructor(addSalesData: AddSalesData) {
    this.addSalesData = addSalesData;
  }

  public async execute(): Promise<Sales> {
    const { carId, price } = this.addSalesData;

    const findCarTask = new FindCarTask(carId);
    const car = await findCarTask.execute();

    const databaseConnection = await DatabaseConnection.getInstance();
    const salesRepository = databaseConnection.getRepository(Sales);

    const sales = await salesRepository.save({ 
      car,
      price, 
      soldDate: new Date() 
    });

    return sales;
  }
}
