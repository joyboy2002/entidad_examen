import { Request, Response } from 'express';
import AddSales, {AddSalesData} from '../tasks/AddSales';
import BaseController from './BaseController';

export default class InventoryInsController extends BaseController {
  public constructor() {
    super('/sales');
  }

  protected configureRouter(): void {
    this.router.post('/', this.addSales.bind(this));
  }

  private async addSales(req: Request, res: Response): Promise<void> {
    try {
      const addCarData = <AddSalesData>req.body;

      const addSalesTask = new AddSales(addCarData);
      const sales = await addSalesTask.execute();
  
      this.respond(res, 200, sales);
    } catch (e) {
      if((<Error>e).message === 'Car not found.') {
        this.respond(res, 404);
      }else {
        this.respond(res, 500);
      }
    }
  }
}
