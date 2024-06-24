import Ride from "../Ride";
import FinishedRideStatus from "./FinishedRideStatus";
import RideStatus from "./RideStatus";

export default class InProgressRideStatus extends RideStatus{
  value: string;

  constructor (ride: Ride) {
    super(ride);
    this.value = "in-progress"
  }

  request(): void {
    throw new Error("Invalid status");
  };

  accept(): void{
    throw new Error("Invalid status");
  };

  start(): void{
    throw new Error("Invalid status");
  };

  finish(): void{
    this.ride.status = new FinishedRideStatus(this.ride);
  };
}