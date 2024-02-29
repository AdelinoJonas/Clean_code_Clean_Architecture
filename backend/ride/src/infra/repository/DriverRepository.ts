const knex = require('../../../knex.js');

export default class DriverRepository {

  async save (driver: any) {
    const { name, email, document, car_plate } = driver;
    return await knex('driver').insert({
        name,
        email,
        document,
        car_plate
      });
  }
  async get (driverId: any) {
    console.log('aaaaaaaaaaaaaaaaa', driverId);
    const driverData = await knex('driver')
    .select()
    .where('driver_id', driverId)
    .first();
    console.log('getDriver', driverData);
    return driverData;
  }
}