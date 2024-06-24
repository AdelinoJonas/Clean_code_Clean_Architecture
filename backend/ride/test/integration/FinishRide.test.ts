import AcceptRide from "../../src/application/usecase/AcceptRide";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import FinishRide from "../../src/application/usecase/FinishRide";
import GetRide from "../../src/application/usecase/GetRide";
import RequestRide from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import DriverRepositoryDataBase from "../../src/infra/repository/DriverRepositoryDataBase";
import PassengerRepositoryDataBase from "../../src/infra/repository/PassengerRepositoryDataBase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDataBase";

test("Deve finalizar uma corrida", async function() {
  const createPassenger = new CreatePassenger(new PassengerRepositoryDataBase());
  const outputCreatePassenger = await createPassenger.execute({
    name: "Jhon Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
  });
  const requestRide = new RequestRide(new RideRepositoryDatabase());
  const outputRequestRide = await requestRide.execute({
    passengerId: outputCreatePassenger.passenger_id,
    from: {
      lat: -27.584905257808835,
      long: -48.545022195325124,
    },
    to: {
      lat: -27.496887588317275,
      long: -48.522234807851476,
    },
    date: new Date("2021-03-01T10:00:00"),
  });
  const createDriver = new CreateDriver(new DriverRepositoryDataBase());
  const outputCreateDriver = await createDriver.execute({
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999",
  });
  const acceptRide = new AcceptRide(new RideRepositoryDatabase());
  await acceptRide.execute({
    rideId: outputRequestRide.rideId,
    driverId: outputCreateDriver.driver_id,
    date: new Date("2024-03-01T10:10:00"),
  });
  const startRide = new StartRide(new RideRepositoryDatabase());
  await startRide.execute({
    rideId: outputRequestRide.rideId,
    date: new Date("2024-03-01T10:20:00")
  });
  const finishRide = new FinishRide(new RideRepositoryDatabase());
  await finishRide.execute({
    rideId: outputRequestRide.rideId,
    date: new Date("2024-03-01T10:50:00")
  });
  const getRide = new GetRide(new RideRepositoryDatabase());
  const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
  expect(outputGetRide.driverId).toBe(outputCreateDriver.driver_id[0].toString());
  expect(outputGetRide.status).toBe('finished');
  expect(outputGetRide.finishDate).toEqual(new Date("2024-03-01T10:50:00"));
});