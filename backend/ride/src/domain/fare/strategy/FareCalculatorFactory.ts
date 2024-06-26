import Segment from "../../ride/Segment";
import NormalFareCalculator from "../strategy/NormalFareCalculator";
import OvernightFareCalculator from "./OvernightFareCalculator";
import OvernightSundayFareCalculator from "./OvernightSundayFareCalculator";
import SundayFareCalculator from "./SundayFareCalculator";

export default class FareCalculatorFactory {
  static create (segment: Segment) {
    if (segment.isOvernight() && !segment.isSunday()) {
      return new OvernightFareCalculator();
    };
    if (segment.isOvernight() && segment.isSunday()) {
      return new OvernightSundayFareCalculator();
    };
    if (!segment.isOvernight() && segment.isSunday()) {
      return new SundayFareCalculator();
    };
    if (!segment.isOvernight() && !segment.isSunday()) {
      return new NormalFareCalculator();
    };
    throw new Error("Invalid segment");
  }
}