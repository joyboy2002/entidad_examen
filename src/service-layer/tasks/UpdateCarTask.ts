import Car from "../../domain-layer/entities/Car";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindCarTask from "./FindCarTask";
import IAsyncTask from "./IAsyncTask";

export type UpdateCarData = {
  id: number,
  model: string,
  brand: string,
  year: number,
};

export default class UpdateCarTask implements IAsyncTask<Car> {
  private updateCarData: UpdateCarData;

  public constructor (carData: UpdateCarData) {
    this.updateCarData = carData;
  }

  public async execute(): Promise<Car> {
    const findCarTask = new FindCarTask(this.updateCarData.id);

    const car = await findCarTask.execute();

    car.model = this.updateCarData.model;
    car.brand = this.updateCarData.brand;
    car.year = this.updateCarData.year;

    const databaseConnection = await DatabaseConnection.getInstance();
    const carRepository = databaseConnection.getRepository(Car);

    carRepository.save(car);

    return car
  }
}