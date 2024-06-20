import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import RequestRide from "../../src/application/usecase/RequestRide";
import PassengerRepositoryDataBase from "../../src/infra/repository/PassengerRepositoryDataBase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDataBase";

test("Deve solicitar uma corrida", async function() {
  const inputCreatePassenger = {
    name: "Jhon Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
  };
  const createPassenger = new CreatePassenger(new PassengerRepositoryDataBase());
  const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);
  const inputRequestRide = {
    passengerId: outputCreatePassenger.passenger_id,
    from: {
      lat: -27.584905257808835,
      long: -48.545022195325124,
    },
    to: {
      lat: -27.496887588317275,
      long: -48.522234807851476,
    },
    date: new Date("2021-03-01T10:00:00")
  };
  const requestRide = new RequestRide( new RideRepositoryDatabase());
  const outputRequestRide = await requestRide.execute(inputRequestRide);
  expect(outputRequestRide.rideId).toBeDefined();

});

// test("Deve obter uma corrida", async function() {
//   const inputCreatePassenger = {
//     name: "Jhon Doe",
//     email: "jhon.doe@gmail.com",
//     document: "83432616074",
//   };
//   const createPassenger = new CreatePassenger(new PassengerRepositoryDataBase());
//   const outputCreatePassenger = await createPassenger.execute(inputCreatePassenger);
//   const inputRequestRide = {
//     passengerId: outputCreatePassenger.passenger_id,
//     from: {
//       lat: -27.584905257808835,
//       long: -48.545022195325124,
//     },
//     to: {
//       lat: -27.496887588317275,
//       long: -48.522234807851476,
//     },
//     date: "2021-03-01T10:00:00"
//   };
//   const requestRide = new RequestRide( new RideRepositoryDatabase());
//   const outputRequestRide = await requestRide.execute(inputRequestRide);
//   const getRide = new GetRide(new RideRepositoryDatabase());
//   const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId });
//   expect(outputGetRide.rideId).toBeDefined();
//   expect(outputGetRide.status).toBe("requested");
// });
