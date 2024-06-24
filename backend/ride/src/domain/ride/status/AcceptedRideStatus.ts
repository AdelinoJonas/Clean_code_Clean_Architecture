import Ride from "../Ride";
import inProgressRideStatus from "./InProgessRideStatus";
import RideStatus from "./RideStatus";

export default class AcceptedRideStatus extends RideStatus{
  value: string;

  constructor (ride: Ride) {
    super(ride);
    this.value = "accepted"
  }

  request(): void {
    throw new Error("Invalid status");
  };

  accept(): void{
    throw new Error("Invalid status");
  };

  start(): void{
    this.ride.status = new inProgressRideStatus(this.ride);
  };

  finish(): void{
    throw new Error("Invalid status");
  };
}