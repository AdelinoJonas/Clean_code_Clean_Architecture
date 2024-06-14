
import CalculateRide from "./application/usecase/CalculateRide";
import CreateDriver from "./application/usecase/CreateDriver";
import CreatePassenger from "./application/usecase/CreatePassenger";
import GetDriver from "./application/usecase/GetDriver";
import GetPassenger from "./application/usecase/GetPassenger";
import DriverRepositoryDataBase from "./infra/repository/DriverRepositoryDataBase";
import PassengerRepositoryDataBase from "./infra/repository/PassengerRepositoryDataBase";
import MainController from "./infra/http/MainController";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const calculateRide = new CalculateRide();
const passengerRepository = new PassengerRepositoryDataBase();
const driverRepository = new DriverRepositoryDataBase();
const createPassenger = new CreatePassenger(passengerRepository);
const getPassenger = new GetPassenger(passengerRepository);
const createDriver = new CreateDriver(driverRepository);
const getDriver = new GetDriver(driverRepository);
const httpServer = new ExpressAdapter();
new MainController(httpServer, calculateRide, createPassenger, getPassenger, createDriver, getDriver,)
httpServer.listen(3000);
