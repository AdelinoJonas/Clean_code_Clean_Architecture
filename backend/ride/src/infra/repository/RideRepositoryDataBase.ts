import knex from '../../../knex';
import RideRepository from '../../application/repository/RideRepository';
import Coord from '../../domain/distance/Coord';
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
    const rideData = await knex('ride').where({ ride_id: rideId }).first();
    if (!rideData) {
      throw new Error('Ride not found');
    }
    const ride = new Ride(
      rideData.passenger_id,
      new Coord(rideData.from_lat, rideData.from_long),
      new Coord(rideData.to_lat, rideData.to_long),
      rideData.status,
      rideData.request_date,
      rideData.ride_id
    );   
    return ride;
  }
}