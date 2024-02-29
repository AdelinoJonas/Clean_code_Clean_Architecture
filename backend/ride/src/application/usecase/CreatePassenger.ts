import { validate } from "../../CpfValidator";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
  constructor ( readonly passengerRepository: PassengerRepository) {
  }

  async execute (input: Input): Promise<Output> {
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const passengerData = await this.passengerRepository.save({
      name: input.name,
      email: input.email,
      document: input.document
    });
    const passenger_id = passengerData[0];
    return {passenger_id: passenger_id};
  }
}

type Input = {
  name: string,
  email: string,
  document: string
}

type Output = {
  passenger_id: any
}