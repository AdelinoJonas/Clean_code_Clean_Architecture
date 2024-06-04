import Driver from "../../domain/Driver";

export default interface DriverRepository {
  save(driver: Driver): Promise<any>;
  get(driverId: string): Promise<Driver>;
}