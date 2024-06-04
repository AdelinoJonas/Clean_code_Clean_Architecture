import DriverRepository from "../../infra/repository/DriverRepositoryDataBase";

export default class GetDriver {
  constructor (readonly driverRepository: DriverRepository) {
  }
  
  async execute (input: Input): Promise<Output> {
    const driverData = await this.driverRepository.get(input.driverId);
    return {
      driverId: driverData.driver_id,
      name: driverData.name, 
      email: driverData.email.value,
      document:driverData.document.value,
      car_plate: driverData.carPlate.value
    }
  }
}

type Input = {
  driverId: string,
}

type Output = {
  driverId: string,
  name: string,
  email: string,
  document: string,
  car_plate: string
}