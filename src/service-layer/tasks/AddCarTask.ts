import Car from '../../domain-layer/entities/Car'
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask'


export type AddCarData = {
  model: string,
  brand: string,
  year: number
}

export default class AddCarTask implements IAsyncTask<Car> {
  private addCarData: AddCarData;

  public constructor(addCarData: AddCarData){
    this.addCarData = addCarData;
  }

  public async execute(): Promise<Car> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const carRepository = databaseConnection.getRepository(Car);

    const car = carRepository.save(this.addCarData);

    return car;
  }
}