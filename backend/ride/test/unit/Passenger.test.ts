import Passenger from "../../src/domain/Passenger";

test("Deve criar um passageiro", function () {
   const passenger = Passenger.create("Jhon Doe","jhon.doe@gmail.com","83432616074");
   expect(passenger.name).toBe("Jhon Doe");
   expect(passenger.email.value).toBe("jhon.doe@gmail.com");
   expect(passenger.document.value).toBe("83432616074");
});
test("Não pode criar um passageiro com cpf inválido", function () {
   expect(() => Passenger.create("Jhon Doe","jhon.doe@gmail.com","83432616076")).toThrow(new Error("Invalid cpf"));
});

test("Não pode criar um passageiro com email inválido", function () {
   expect(() => Passenger.create("Jhon Doe","jhon.doe@","83432616074")).toThrow(new Error("Invalid email"));
});