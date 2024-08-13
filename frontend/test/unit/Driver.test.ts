import Driver from "../../src/domain/Driver";

test("Não deve criar um passageiro com nome inválido", function () {
  expect(() => new Driver("", "John", "joana@gmail.com", "83432616074","AAA9999")).toThrow("Invalid name");
});
test("Não deve criar um passageiro com email inválido", function () {
  expect(() => new Driver("", "John Doe", "joana@gmail", "83432616074","AAA9999")).toThrow("Invalid email");
});
test("Não deve criar um passageiro com documento inválido", function () {
  expect(() => new Driver("", "John Doe", "joana@gmail.com", "83432616075","AAA9999")).toThrow("Invalid cpf");
});
test("Não deve criar um passageiro com placa do carro inválida", function () {
  expect(() => new Driver("", "John Doe", "joana@gmail.com", "83432616074","AAA999")).toThrow("Invalid car plate");
});