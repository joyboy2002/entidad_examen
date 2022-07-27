import request from "supertest";
import sinon from 'sinon';
import expect from "expect";
import app from "../../../src/app";
import Car from "../../../src/domain-layer/entities/Car";
import GetCarListTaskMock from "./test-doubles/GetCarListTaskMock";
import FindCarTaskMock from "./test-doubles/FindCarTaskMock";
import AddCarTaskMock from "./test-doubles/AddCarTaskMock";
import UpdateCarTaskMock from "./test-doubles/UpdateCarTaskMock";
import DeleteCarTaskMock from "./test-doubles/DeleteCarTaskMock";
import {AddCarData} from "../../../src/service-layer/tasks/AddCarTask";
import {UpdateCarData} from "../../../src/service-layer/tasks/UpdateCarTask";

describe('CarsController tests', () => {
  let sandbox: sinon.SinonSandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('Get cars list endpoint tests', () => {
    let getCarListTaskMock: GetCarListTaskMock;

    const carsList: Car[] = [
      new Car(1, 'Sorento', 'KIA', 2021),
      new Car(2, 'XC40', 'Volvo', 2022),
      new Car(3, 'Jetta', 'Volkswagen', 2019),
    ];

    beforeEach(() => {
      getCarListTaskMock = new GetCarListTaskMock(sandbox);
    });

    it('should respond 200 OK and also respond with a list of cars', async () => {
      getCarListTaskMock.withExecuteReturning(carsList);

      const response = await request(app)
        .get('/cars')
        .expect(200);

      expect(response.body).toEqual(carsList);
      getCarListTaskMock.expectExecuteWasCalledOnce();
    });

    it('should respond with 500 Internal Server Error and  handle unknown errors ', async () => {
      getCarListTaskMock.withExecuteThrowingError('This is not gonna end well...');

      await request(app)
        .get('/cars')
        .expect(500);

      getCarListTaskMock.expectExecuteWasCalledOnce();
    });
  });

  context('Find car endpoint tests', () => {
    let findCarTaskMock: FindCarTaskMock;

    const carId = 1;
    const car = new Car(carId, 'Sorento', 'KIA', 2021);

    beforeEach(() => {
      findCarTaskMock = new FindCarTaskMock(sandbox);
    });

    it('should respond 200 OK with a car', async () => {
      findCarTaskMock.withExecuteReturning(car);

      const response = await request(app)
        .get(`/cars/${carId}`)
        .expect(200);

      expect(response.body).toEqual(car);
      findCarTaskMock.expectExecuteWasCalledOnceForCar(carId);
    });

    it('should respond 404 NotFound if the car we are looking for doesn\'t exist', async () => {
      findCarTaskMock.withExecuteThrowingNotFoundError();

      await request(app)
        .get(`/cars/${carId}`)
        .expect(404);

      findCarTaskMock.expectExecuteWasCalledOnceForCar(carId);
    });

    it('should respond 500 Internal Server Error and handle unknown errors', async () => {
      findCarTaskMock.withExecuteThrowingError('You\'re not gonna pass!');

      await request(app)
        .get(`/cars/${carId}`)
        .expect(500);

      findCarTaskMock.expectExecuteWasCalledOnceForCar(carId);
    });
  });

  context('Add car endpoint tests', () => {
    let addCarTaskMock: AddCarTaskMock;

    const carData: AddCarData = { model: 'new Sorento', brand: 'new KIA', year: 2021 }
    const car = new Car(1, carData.model, carData.brand, carData.year);

    beforeEach(() => {
      addCarTaskMock = new AddCarTaskMock(sandbox);
    });

    it('should respond 200 OK with our new created car', async () => {
      addCarTaskMock.withExecuteReturning(car);

      const response = await request(app)
        .post('/cars')
        .set('Content-Type', 'application/json')
        .send(carData)
        .expect(200);

      expect(response.body).toEqual(car);
      addCarTaskMock.expectExecuteWasCalledOnceWithCarData(carData);
    });

    it('should respond with 500 Internal Server Error and handle unknown errors ', async () => {
      addCarTaskMock.withExecuteThrowingError('This is wrong.');

      await request(app)
        .post('/cars')
        .set('Content-Type', 'application/json')
        .send(carData)
        .expect(500);

      addCarTaskMock.expectExecuteWasCalledOnceWithCarData(carData);
    });
  });

  context('Update car endpoint tests', () => {
    let updateCarTaskMock: UpdateCarTaskMock;

    const carData: UpdateCarData = { id: 1, model: 'Sorento', brand: 'KIA', year: 2021 }
    const car = new Car(carData.id, carData.model, carData.brand, carData.year);

    beforeEach(() => {
      updateCarTaskMock = new UpdateCarTaskMock(sandbox);
    });

    it('should respond 200 OK with a car', async () => {
      updateCarTaskMock.withExecuteReturning(car);

      const response = await request(app)
        .put('/cars')
        .set('Content-Type', 'application/json')
        .send(carData)
        .expect(200);

      expect(response.body).toEqual(car);
      updateCarTaskMock.expectExecuteWasCalledOnceWithCarData(carData);
    });

    it('should respond 404 NotFound if car doesn\'t exist', async () => {
      updateCarTaskMock.withExecuteThrowingNotFoundError();

      await request(app)
        .put('/cars')
        .set('Content-Type', 'application/json')
        .send(carData)
        .expect(404);

      updateCarTaskMock.expectExecuteWasCalledOnceWithCarData(carData);
    });

    it('should respond 500 Internal Server Error and handle unknown errors ', async () => {
      updateCarTaskMock.withExecuteThrowingError("Try again");

      await request(app)
        .put('/cars')
        .set('Content-Type', 'application/json')
        .send(carData)
        .expect(500);

      updateCarTaskMock.expectExecuteWasCalledOnceWithCarData(carData);
    });
  });

  context('Delete car endpoint tests', () => {
    let deleteCarTaskMock: DeleteCarTaskMock;

    const carId = 1;

    beforeEach(() => {
      deleteCarTaskMock = new DeleteCarTaskMock(sandbox);
    });

    it('should respond 200 OK after deleting a car', async () => {
      deleteCarTaskMock.withExecuteSucceeding();

      await request(app)
        .delete(`/cars/${carId}`)
        .expect(200);

      deleteCarTaskMock.expectExecuteWasCalledOnceForCar(carId);
    });

    it('should respond 500 Internal Server Error and handle unknown errors', async () => {
      deleteCarTaskMock.withExecuteThrowingError('Better luck next time');

      await request(app)
        .delete(`/cars/${carId}`)
        .expect(500);

      deleteCarTaskMock.expectExecuteWasCalledOnceForCar(carId);
    });
  });
});
