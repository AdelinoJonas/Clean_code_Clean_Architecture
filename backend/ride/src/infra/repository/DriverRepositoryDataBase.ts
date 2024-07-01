import DriverRepository from "../../application/repository/DriverRepository";
import knex from '../../../knex';
import Driver from "../../domain/driver/Driver";

export default class DriverRepositoryDataBase implements DriverRepository {

  async save (driver: Driver) {
    const { name, email, document, carPlate } = driver;
    const driverId = await knex('driver').insert({
      name,
      email: email.value,
      document: document.value,
      car_plate: carPlate.value
    });
    return driverId[0].toString();
  }

  async get (driverId: string) {
    const driverData = await knex('driver')
    .select()
    .where('driver_id', driverId)
    .first();
    return new Driver(driverData.name, driverData.email, driverData.document, driverData.carPlate);
  }
}
