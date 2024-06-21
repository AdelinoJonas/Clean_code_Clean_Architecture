import knex from '../../../knex';
import RideRepository from '../../application/repository/RideRepository';
import Ride from '../../domain/ride/Ride';

export default class RideRepositoryDatabase implements RideRepository {
  constructor() {}

  async save(ride: Ride): Promise<Ride> {
    const rideData = {
      passenger_id: ride.passengerId,
      from_lat: ride.from.lat,
      from_long: ride.from.long,
      to_lat: ride.to.lat,
      to_long: ride.to.long,
      status: ride.status,
      request_date: ride.request_date,
      price: ride.calculate()
    };
    const [rideId] = await knex('ride').insert(rideData, 'ride_id');
    ride.rideId = rideId;
    return ride;
  }

  async get(rideId: string): Promise<Ride> {
    throw new Error('Method not implemented.');
  }
}