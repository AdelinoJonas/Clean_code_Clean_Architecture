import Ride from "../Ride";
import inProgressRideStatus from "./InProgessRideStatus";
import RideStatus from "./RideStatus";

export default class FinishedRideStatus extends RideStatus{
  value: string;

  constructor (ride: Ride) {
    super(ride);
    this.value = "finished"
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
    throw new Error("Invalid status");
  };
}