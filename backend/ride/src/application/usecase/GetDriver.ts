const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'my_uber_db'
  },
  useNullAsDefault: true
});

export default class GetDriver {
  constructor () {
  }
  
  async execute (input: Input): Promise<Output> {
    const { driverId } = input;
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