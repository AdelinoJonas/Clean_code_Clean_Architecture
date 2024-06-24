import RideRepository from "../repository/RideRepository";

export default class FinishRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.finish(input.date);
    await this.rideRepository.update(ride);
  }
}

type Input = {
  rideId: string,
  date: Date,
};
