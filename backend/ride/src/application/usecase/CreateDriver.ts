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
      console.log("driverData", driverData)
    return (driverData);
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