import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";
const knex = require('../../../knex.js');

export default class PassengerRepositoryDataBase implements PassengerRepository {

  async save (passenger: Passenger) {
    const { name, email, document } = passenger;
     const saved = await knex('passenger').insert({
        name,
        email:email.value,
        document:document.value,
      }); 
      return saved[0]
  }

  async get (passengerId: string) {
    const passengerData = await knex('passenger')
    .select()
    .where('passenger_id', passengerId)
    .first();
    
    return {
      passengerId: passengerData.passenger_id,
      name: passengerData.name,
      email: passengerData.email,
      document:passengerData.document
    };
  }
}