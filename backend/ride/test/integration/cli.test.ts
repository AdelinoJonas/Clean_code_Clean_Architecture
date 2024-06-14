import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import CLIController from "../../src/infra/cli/CLIController";
import InputOutputHandler from "../../src/infra/cli/InputOutputHandler";
import PassengerRepositoryDataBase from "../../src/infra/repository/PassengerRepositoryDataBase";

test("Deve criar um passageiro com cli", async function(){
    const output: any  = [];
    const passengerRepository = new PassengerRepositoryDataBase();
    const createPassenger = new CreatePassenger(passengerRepository);
    const inputOutput = new class extends InputOutputHandler {
        write(text: string):void {
            output.push(JSON.parse(text));
        }
    }
    new CLIController(inputOutput, createPassenger);
    await inputOutput.type("create-passenger ana ana@gmail.com 83432616074");  
    expect(output[0].passenger_id).toBeDefined();
});