const knex = require('../../../knex.js');

export default class GetDriver {
  constructor () {
  }
  
  async execute (input: Input): Promise<Output> {
    const { driverId } = input;
    console.log('aaaaaaaaaaaaaaaaa', driverId);
    const driverData = await knex('driver')
    .select()
    .where('driver_id', driverId)
    .first();
    return {
      driverId: driverData.driver_id,
      name: driverData.name,
      email: driverData.email,
      document:driverData.document,
      car_plate: driverData.car_plate
    }
  }
}

type Input = {
  driverId: string,
}

type Output = {
  driverId: string,
  name: string,
  email: string,
  document: string,
  car_plate: string
}