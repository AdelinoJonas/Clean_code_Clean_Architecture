import { validate } from "../../CpfValidator";
import DriverRepository from "../../infra/repository/DriverRepository";

export default class CreateDriver {
  constructor () {
  }

  async execute (input: Input): Promise<Output> {
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const driverRepository = new DriverRepository();
    const driverData = await driverRepository.save({
      name: input.name,
      email: input.email,
      document: input.document,
      car_plate: input.car_plate
    });
    console.log(driverData);
    
    return { driver_id: driverData[0] };
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