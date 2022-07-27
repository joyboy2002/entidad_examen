import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
import CarsController from './service-layer/controllers/CarsController';
import SalesController from './service-layer/controllers/SalesController';

const app = express();

app.use(json());

const carsController = new CarsController();
const salesController = new SalesController();

carsController.mount(app);
salesController.mount(app);

export default app;