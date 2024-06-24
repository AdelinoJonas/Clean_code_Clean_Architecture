import Ride from "../Ride";
import AcceptedRideStatus from "./AcceptedRideStatus";
import FinishedRideStatus from "./FinishedRideStatus";
import InProgressRideStatus from "./InProgessRideStatus";
import RequestRideStatus from "./RequestRideStatus";

export default class RideStatusFactory {
  static create (ride: Ride, status: string){
    if(status === "request") {
      return new RequestRideStatus(ride);
    }
    if(status === "Accepted") {
      return new AcceptedRideStatus(ride);
    }
    if(status === "in-progress") {
      return new InProgressRideStatus(ride);
    }
    if(status === "finished") {
      return new FinishedRideStatus(ride);
    }
    throw new Error("Invalid status")
  }
}