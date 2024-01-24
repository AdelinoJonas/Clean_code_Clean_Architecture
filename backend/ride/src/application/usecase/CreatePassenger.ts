import { validate } from "../../CpfValidator";
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'my_uber_db'
  },
  useNullAsDefault: true
});

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