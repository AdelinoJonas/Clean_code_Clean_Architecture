import RideRepository from "../repository/RideRepository";

export default class GetRide {
  constructor (readonly rideRepository: RideRepository) {}
  
  async execute(input: Input): Promise<Output> {
    try {
      const ride = await this.rideRepository.get(input.rideId);
      const rideId = ride.rideId ? ride.rideId.toString() : '';
      return {
        rideId: rideId,
        driverId: ride.driverId,
        status: ride.status,
        requestDate: ride.request_date,
        acceptDate: ride.acceptDate
      };
    } catch (error) {
      throw error;
    }
  }
}

type Input = {
  rideId: string,
}

type Output = {
  rideId: string,
  driverId?: string,
  status: string,
  requestDate: Date,
  acceptDate?: Date
}