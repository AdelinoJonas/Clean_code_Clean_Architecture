export default interface DriverRepository {
  save(driver: any): Promise<any>;
  get(driverId: string): Promise<any>;
}