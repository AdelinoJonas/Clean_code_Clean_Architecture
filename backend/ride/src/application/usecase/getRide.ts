import RideRepository from "../repository/RideRepository";

export default class GetRide {
  constructor (readonly rideRepository: RideRepository) {}
  
  async execute(input: Input): Promise<Output> {
    try {
      const ride = await this.rideRepository.get(input.rideId);
      const rideId = ride.rideId ? ride.rideId.toString() : '';
      return {
        rideId: rideId,
        status: ride.status,
        requestDate: ride.request_date
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
  status: string,
  requestDate: Date
}