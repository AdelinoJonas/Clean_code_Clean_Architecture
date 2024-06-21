import Coord from "../../domain/distance/Coord";
import Ride from "../../domain/ride/Ride";
import RideRepository from "../repository/RideRepository";

export default class RequestRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = Ride.create(
      input.passengerId,
      new Coord(input.from.lat, input.from.long),
      new Coord(input.to.lat, input.to.long)
    );

    try {
      const savedRide = await this.rideRepository.save(ride);
      if (!savedRide || !savedRide.rideId) {
        throw new Error('Ride not saved correctly');
      }
      return { rideId: savedRide.rideId.toString() };
    } catch (error) {
      console.error("Erro ao salvar o ride:", error);
      throw error;
    }
  }
}

type Input = {
  passengerId: string;
  from: { lat: number; long: number };
  to: { lat: number; long: number };
  date: Date;
};

type Output = {
  rideId: string;
};