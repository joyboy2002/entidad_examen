import Car from "../../domain-layer/entities/Car";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";

import IAsyncTask from "./IAsyncTask";


export default class GetCarListTask implements IAsyncTask<Car[]> {
    public async execute(): Promise<Car[]> {
      const databaseConnection = await DatabaseConnection.getInstance();
      const carRepository = databaseConnection.getRepository(Car);
      return carRepository.find();
    }
  }
