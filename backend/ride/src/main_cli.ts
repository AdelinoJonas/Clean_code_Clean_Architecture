import CreatePassenger from "./application/usecase/CreatePassenger";
import CLIController from "./infra/cli/CLIController";
import NodeInputOutput from "./infra/cli/NodeInputOutput";
import PassengerRepositoryDataBase from "./infra/repository/PassengerRepositoryDataBase";

const passengerRepository = new PassengerRepositoryDataBase();
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);
