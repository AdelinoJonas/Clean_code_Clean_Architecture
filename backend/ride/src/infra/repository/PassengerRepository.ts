const knex = require('../../../knex.js');

export default class PassengerRepository {

  async save (passenger: any) {
    const { name, email, document } = passenger;
    return await knex('passenger').insert({
        name,
        email,
        document,
      });    
  }

  async get (passengerId: any) {
    const passengerData = await knex('passenger')
    .select()
    .where('passenger_id', passengerId)
    .first();
    console.log('getPassenger', passengerData);
    return passengerData;
  }
}