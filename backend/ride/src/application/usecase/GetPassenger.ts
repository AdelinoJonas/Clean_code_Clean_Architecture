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

export default class GetPassenger {
  constructor () {
  }
  
  async execute (input: Input): Promise<Output> {
    const { passengerId } = input;
    const passengerData = await knex('passenger')
    .select()
    .where('passenger_id', passengerId)
    .first();
    return {
      passengerId: passengerData.passenger_id,
      name: passengerData.name,
      email: passengerData.email,
      document:passengerData.document
    }
  }
}

type Input = {
  passengerId: string,
}

type Output = {
  passengerId: string,
  name: string,
  email: string,
  document: string
}