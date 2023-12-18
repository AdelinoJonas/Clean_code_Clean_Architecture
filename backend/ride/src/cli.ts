import { validate } from "./CpfValidator";

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

process.stdin.on("data", async function(chunk){
  const command = chunk.toString().replace(/\n/g, "");
  try {
    if (command.startsWith("create-passenger")) {
      const [ name, email, document ] = command.replace("create-passenger","").split("");
      if (!validate(document)) throw new Error("Invalid cpf");
      await knex('passenger').insert({
        name,
        email,
        document,
      });
    }
  } catch (e:any) {
    console.log(e.message);
  }
  
})