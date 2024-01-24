import { validate } from "../../CpfValidator";
const knex = require('../../../knex.js');

export default class CreateDriver {
  constructor () {
  }

  async execute (input: Input): Promise<Output> {
    const { name, email, document, car_plate } = input;
    if (!validate(input.document)) throw new Error("Invalid cpf");
    const driverData = await knex('driver').insert({
        name,
        email,
        document,
        car_plate
      });
    return {driver_id: driverData[0]};
  }
}

type Input = {
  name: string,
  email: string,
  document: string,
  car_plate: string
}

type Output = {
  driver_id: string
}