const knex = require('../../../knex.js');

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