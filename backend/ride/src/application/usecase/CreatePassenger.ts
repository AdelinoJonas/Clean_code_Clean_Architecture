import { validate } from "../../CpfValidator";
const knex = require('../../../knex.js');

export default class CreatePassenger {
  constructor () {
  }

  async execute (input: Input): Promise<Output> {
    const { name, email, document } = input;
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const passengerData = await knex('passenger').insert({
        name,
        email,
        document,
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