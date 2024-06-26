import Coord from "../distance/Coord";
import DistanceCalculator from "../distance/DistanceCalculator";
import FareCalculatorHandler from "../fare/chain_of_responsability/FareCalculatorHandler";
import NormalFareCalculatorHandler from "../fare/chain_of_responsability/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../fare/chain_of_responsability/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../fare/chain_of_responsability/OvernightSundayFareCalculatorHandler";
import SundayFareCalculatorHandler from "../fare/chain_of_responsability/SundayFareCalculatorHandler";
import Position from "./Position";
import Segment from "./Segment";
// import RideStatus from "./status/RideStatus";
// import RideStatusFactory from "./status/RideStatusFactory";

export default class Ride {
	positions: Position[];
	MIN_PRICE = 10;
	fareCalculator: FareCalculatorHandler;
  rideId: string | undefined;
	driverId?: string;
	acceptDate?: Date;
	startDate?: Date;
	finishDate?: Date;
	// status: RideStatus;

	constructor (
    readonly passengerId: string,
    readonly from: Coord,
    readonly to: Coord,
    public status: string,
    readonly request_date: Date,
    rideId?: string
  ) {
		this.positions = [];
		const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler();
		const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator);
		const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator);
		this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator);
		// this.status = RideStatusFactory.create(this, status);
    this.rideId = rideId;
	}

	addPosition (lat: number, long: number, date: Date) {
		this.positions.push(new Position(lat, long, date));
	}

	calculate () {
		let price = 0;
		for (const [index, position] of this.positions.entries()) {
			const nextPosition = this.positions[index + 1];
			if (!nextPosition) break;
			const distance = DistanceCalculator.calculate(position.coord, nextPosition.coord);
			const segment = new Segment(distance, nextPosition.date);
			price += this.fareCalculator.handle(segment);
 		}
		return (price < this.MIN_PRICE) ? this.MIN_PRICE : price;
	}

	accept (driverId: string, date: Date) {
		if (this.status !== "requested") throw new Error("Invalid status")
		this.driverId = driverId;
		// this.status.accept();
		this.status = "accepted";
		this.acceptDate = date;
	}

	start (date: Date) {
		if (this.status !== "accepted") throw new Error("Invalid status")
		// this.status.start();
		this.status = "in-progress";
		this.startDate = date;
	}

	finish (date: Date) {
		if (this.status !== "in-progress") throw new Error("Invalid status")
		// this.status.finish();
		this.status = "finished";
		this.finishDate = date;
	}

	static create (passengerId: string, from: Coord, to: Coord, requestDate: Date = new Date()) {
		const status = "requested";
		return new Ride(passengerId, from, to, status, requestDate);
	}
}