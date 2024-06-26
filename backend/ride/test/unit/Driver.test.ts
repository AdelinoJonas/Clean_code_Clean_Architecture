import Driver from "../../src/domain/driver/Driver";

test("Deve criar um motorista", function () {
   const driver = Driver.create("Jhon Doe","jhon.doe@gmail.com","83432616074", "AAA9999");
   expect(driver.name).toBe("Jhon Doe");
   expect(driver.email.value).toBe("jhon.doe@gmail.com");
   expect(driver.document.value).toBe("83432616074");
   expect(driver.carPlate.value).toBe("AAA9999");
});
test("Não pode criar um motorista com cpf inválido", function () {
   expect(() => Driver.create("Jhon Doe","jhon.doe@gmail.com","83432616076", "AAA9999")).toThrow(new Error("Invalid cpf"));
});

test("Não pode criar um motorista com email inválido", function () {
   expect(() => Driver.create("Jhon Doe","jhon.doe@","83432616074", "AAA9999")).toThrow(new Error("Invalid email"));
});
test("Não pode criar um motorista com placa do carro inválida", function () {
   expect(() => Driver.create("Jhon Doe","jhon.doe@gmail.com","83432616074", "AAA999")).toThrow(new Error("Invalid car plate"));
});