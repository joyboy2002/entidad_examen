
import { Response, Request, application, json } from 'express';
import GetCarListTask from '../tasks/GetCarListTask';
import FindCarTask from '../tasks/FindCarTask';
import UpdateCarTask, { UpdateCarData } from '../tasks/UpdateCarTask';
import BaseController from "./BaseController"
import AddCarTask, { AddCarData } from '../tasks/AddCarTask';
import DeleteCarTask from '../tasks/DeleteCarTask';


export default class CarsController extends BaseController{
  public constructor(){
    super('/cars');
  }

  protected configureRouter(): void {
    this.router.get('/', this.getCarsList.bind(this));
    this.router.get('/:id', this.findCar.bind(this));
    this.router.post('/', this.addCar.bind(this));
    this.router.put('/', this.updateCar.bind(this));
    this.router.delete('/:id', this.deleteCar.bind(this));
  }

  private async getCarsList(req: Request, res: Response): Promise<void>{
    try {
      const getCarListTask = new GetCarListTask();
      const carsList = await getCarListTask.execute();

      this.respond(res, 200, carsList);
    } catch (e) {
      this.respond(res, 500);
    }
  }

  private async findCar(req: Request, res: Response): Promise<void> {
    try{
      const carId = parseInt(req.params.id);
      const getCarListTask = new FindCarTask(carId);

      const car = await getCarListTask.execute();

      this.respond(res, 200, car);
    }catch (e){
     if ((<Error>e).message === 'Car not found.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }

  }

  private async addCar(req: Request, res: Response): Promise<void> {
    try {
      const carData = <AddCarData>req.body;

      const addCarTask = new AddCarTask(carData);

      const car = await addCarTask.execute();

      this.respond(res, 200, car);

    } catch (e) {
      this.respond(res, 500);
    }
  }

  private async updateCar(req: Request, res: Response): Promise<void> {
      try {
        const carData = <UpdateCarData>req.body;
  
        const updateCarTask = new UpdateCarTask(carData);
  
        const updatedCar = await updateCarTask.execute();
  
        this.respond(res, 200, updatedCar);
      } catch (e) {
        if ((<Error>e).message === 'Car not found.') {
          this.respond(res, 404);
        } else {
          this.respond(res, 500);
        }
      }
  }

  private async deleteCar(req: Request, res: Response): Promise<void> {
    try {
      const carId = parseInt(req.params.id);
      const deleteCarTask = new DeleteCarTask(carId);

      await deleteCarTask.execute();

      this.respond(res, 200);
    } catch (e) {
      this.respond(res, 500);
    }
  }

}