import DriverRepository from "../../application/repository/DriverRepository";
import knex from '../../../knex';

export default class DriverRepositoryDataBase implements DriverRepository {

  async save (driver: any) {
    const { name, email, document, car_plate } = driver;
    return await knex('driver').insert({
        name,
        email,
        document,
        car_plate
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