import { validate } from "../../CpfValidator";
import PassengerRepository from "../../infra/repository/PassengerRepository";
const knex = require('../../../knex.js');

export default class CreatePassenger {
  constructor () {
  }

  async execute (input: Input): Promise<Output> {
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const passegerRepository = new PassengerRepository();
    const passengerData = await passegerRepository.save({
      name: input.name,
      email: input.email,
      document: input.document
    });
    return {passenger_id: passengerData[0]};
  }
}

type Input = {
  name: string,
  email: string,
  document: string
}

type Output = {
  passenger_id: string
}