import PassengerRepository from "../../application/repository/PassengerRepository";
const knex = require('../../../knex.js');

export default class PassengerRepositoryDataBase implements PassengerRepository {

  async save (passenger: any) {
    const { name, email, document } = passenger;
    return await knex('passenger').insert({
        name,
        email,
        document,
      });    
  }

  async get (passengerId: string) {
    const passengerData = await knex('passenger')
    .select()
    .where('passenger_id', passengerId)
    .first();
    return passengerData;
  }
}