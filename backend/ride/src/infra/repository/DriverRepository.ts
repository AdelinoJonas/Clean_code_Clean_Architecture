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
}