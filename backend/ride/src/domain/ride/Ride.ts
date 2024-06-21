import Coord from "../distance/Coord";
import DistanceCalculator from "../distance/DistanceCalculator";
import FareCalculatorHandler from "../fare/chain_of_responsability/FareCalculatorHandler";
import NormalFareCalculatorHandler from "../fare/chain_of_responsability/NormalFareCalculatorHandler";
import OvernightFareCalculatorHandler from "../fare/chain_of_responsability/OvernightFareCalculatorHandler";
import OvernightSundayFareCalculatorHandler from "../fare/chain_of_responsability/OvernightSundayFareCalculatorHandler";
import SundayFareCalculatorHandler from "../fare/chain_of_responsability/SundayFareCalculatorHandler";
import Position from "./Position";
import Segment from "./Segment";

export default class Ride {
  positions: Position[];
  MIN_PRICE = 10;
  fareCalculator: FareCalculatorHandler;
  rideId: string | undefined;

  constructor (
    readonly passengerId: string,
    readonly from: Coord,
    readonly to: Coord,
    readonly status: string,
    readonly request_date: Date,
  ) {
    this.positions = [];
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler();
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator);
    const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator);
    this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator);
  }

  addPosition(lat: number, long: number, date: Date) {
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

  static create(passengerId: string, from: Coord, to: Coord, request_date: Date = new Date()): Ride {
    const status = "requested";
    return new Ride(passengerId, from, to, status, request_date);
  }
}