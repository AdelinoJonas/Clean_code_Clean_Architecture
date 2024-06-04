import DriverRepository from "../../application/repository/DriverRepository";
import knex from '../../../knex';
import Driver from "../../domain/Driver";
import Email from "../../domain/Email";


export default class DriverRepositoryDataBase implements DriverRepository {

  async save (driver: Driver) {
    const { name, email, document, carPlate } = driver;
    return await knex('driver').insert({
        name,
        email: email.value,
        document: document.value,
        car_plate: carPlate.value
      });
  }

  async get (driverId: string) {
    const driverData = await knex('driver')
    .select()
    .where('driver_id', driverId)
    .first();
    return driverData;
  }
}
