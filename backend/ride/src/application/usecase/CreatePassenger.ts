import { validate as validateCpf } from "../../CpfValidator";
import { validate as validateEmail } from "../../EmailValidator";
import PassengerRepository from "../repository/PassengerRepository";

export default class CreatePassenger {
  constructor ( readonly passengerRepository: PassengerRepository) {
  }

  async execute (input: Input): Promise<Output> {
    if (!validateCpf(input.document)) throw new Error("Invalid cpf");
    if (!validateEmail(input.email))throw new Error("Invalid email")
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