import Driver from "../../domain/driver/Driver";

export default interface DriverRepository {
  save(driver: Driver): Promise<any>;
  get(driverId: string): Promise<Driver>;
}