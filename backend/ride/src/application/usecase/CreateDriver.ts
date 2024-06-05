
import Driver from "../../domain/Driver";
import DriverRepository from "../repository/DriverRepository";

export default class CreateDriver {
  constructor (readonly driverRepository: DriverRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
    const driverData = await this.driverRepository.save(driver);
    return { driver_id: driverData};
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
  carPlate: string
}

type Output = {
  driver_id: string
}