import Car from '../../domain-layer/entities/Car';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';



export default class DeleteCarTask implements IAsyncTask<void> {
  private carId: number;

  public constructor(carId: number){
    this.carId = carId;
  }

  public async execute(): Promise<void> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const carRepository = databaseConnection.getRepository(Car);

    await carRepository.delete(this.carId);
  }

  public async executeFind(): Promise<Car> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const carRepository = databaseConnection.getRepository(Car);

    const car = await carRepository.findOneBy({ id : this.carId });
    
    if (!car) {
      throw new Error('No more Cars to delete in the DB.');
    }

    return car;

  }
}