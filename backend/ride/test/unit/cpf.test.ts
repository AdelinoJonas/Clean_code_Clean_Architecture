import Cpf from "../../src/domain/person/Cpf";

test.each([
  "83432616074",
  "87175659520",
  "74587887803"
])("Deve testar os cpfs validos", function (value: string) {
  const cpf = new Cpf(value);
  expect(cpf.value).toBe(value);
});

test.each([
  "83432616076",
  "99999999999",
  "834326160",
  ""
])("Deve testar os cpfs invalidos", function (cpf: string) {
  expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});