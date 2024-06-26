import CreatePassenger from "../../application/usecase/CreatePassenger";
import InputOutputHandler from "./InputOutputHandler";

export default class CLIController {
  
  constructor(inputOutput: InputOutputHandler, createPassenger: CreatePassenger){
    inputOutput.on("create-passenger", async function (params: any) {
      try {
          const [name, email, document] = params.split(" ");
          const output = await createPassenger.execute({name, email, document});
          inputOutput.write(JSON.stringify(output)); 
      } catch (e:any) {
          inputOutput.write(e.message);
      }
    })
  }
};