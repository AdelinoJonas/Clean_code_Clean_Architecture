import Passenger from "../../src/domain/Passenger";

test("Não deve criar um passageiro inválido", function () {
  expect(() => new Passenger("", "John", "joana@gmail.com", "83432616074")).toThrow("Invalid name");
});