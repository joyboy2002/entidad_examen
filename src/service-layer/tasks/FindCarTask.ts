import Car from "../../domain-layer/entities/Car";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import IAsyncTask from "./IAsyncTask";

export default class FindCarTask implements IAsyncTask<Car> {
  private carId: number;

  public constructor(carId: number){
    this.carId = carId;
  }

  public async execute(): Promise<Car> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const carRepository = databaseConnection.getRepository(Car);

    const car = await carRepository.findOneBy({ id : this.carId });
    
    if (!car) {
      throw new Error('Car not found.');
    }

    return car;

  }
}