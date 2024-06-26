import RideRepository from "../repository/RideRepository";

export default class AcceptRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.accept(input.driverId, input.date);
    const finish = await this.rideRepository.update(ride);
  }
}

type Input = {
  rideId: string;
  driverId: string
  date: Date;
};
