import PassengerRepository from "../../application/repository/PassengerRepository";
import Passenger from "../../domain/Passenger";
import knex from '../../../knex';

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
    return new Passenger(passengerData.name, passengerData.email, passengerData.document);
  }
}