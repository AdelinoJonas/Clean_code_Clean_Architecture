import { validate } from "../../CpfValidator";
import DriverRepository from "../repository/DriverRepository";

export default class CreateDriver {
  constructor (readonly driverRepository: DriverRepository) {
  }

  async execute (input: Input): Promise<Output> {
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const driverData = await this.driverRepository.save({
      name: input.name,
      email: input.email,
      document: input.document,
      car_plate: input.car_plate
    });
    
    return { driver_id: driverData};
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
  car_plate: string
}

type Output = {
  driver_id: any
}