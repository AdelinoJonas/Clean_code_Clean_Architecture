import CreatePassenger from "./application/usecase/CreatePassenger";
import PassengerRepositoryDataBase from "./infra/repository/PassengerRepositoryDataBase";

process.stdin.on("data", async function(chunk){
  const command = chunk.toString().replace(/\n/g, "");
  try {
    if (command.startsWith("create-passenger")) {
      const [ name, email, document ] = command.replace("create-passenger","").split("");
      const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
      await usecase.execute({name, email, document});
    }
  } catch (e:any) {
    console.log(e.message);
  }
  
})