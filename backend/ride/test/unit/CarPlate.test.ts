import Carplate from "../../src/domain/CarPlate"

test("Deve testar uma placa válida", function () {
  const carPlate = new Carplate("AAA9999");
  expect(carPlate).toBeDefined();
});
test("Não Deve testar uma placa inválida", function () {
  expect(() => new Carplate("AAA999")).toThrow(new Error("Invalid car plate"));
});