import Ride from "../../domain/ride/Ride";

export default interface RideRepository {
  save(ride: Ride): Promise<Ride>;
  get(rideId: string): Promise<Ride>;
}