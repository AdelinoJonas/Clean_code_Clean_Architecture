import Passenger from "../../src/domain/Passenger";

test("Deve criar um passageiro", function () {
   const passenger = new Passenger("Jhon Doe","jhon.doe@gmail","83432616074");
   expect(passenger.name).toBe("Jhon Doe");
   expect(passenger.email).toBe("jhon.doe@gmail");
   expect(passenger.document).toBe("83432616074");
});