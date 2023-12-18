import CreatePassenger from "./application/usecase/CreatePassenger";

process.stdin.on("data", async function(chunk){
  const command = chunk.toString().replace(/\n/g, "");
  try {
    if (command.startsWith("create-passenger")) {
      const [ name, email, document ] = command.replace("create-passenger","").split("");
      const usecase = new CreatePassenger();
      const output = await usecase.execute({name, email, document});
      console.log(output);
    }
  } catch (e:any) {
    console.log(e.message);
  }
  
})