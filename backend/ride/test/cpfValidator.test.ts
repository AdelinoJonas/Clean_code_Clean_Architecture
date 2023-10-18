import { validate } from "../src/CpfValidator";

test.each([
  "83432616074",
  "87175659520",
  "74587887803"
])("Deve testar os cpfs validos", function (cpf: string) {
  const isValid = validate(cpf);
  expect(isValid).toBeTruthy();
});

test.each([
  "83432616076",
  "99999999999",
  "834326160",
  ""
])("Deve testar os cpfs invalidos", function (cpf: string) {
  const isValid = validate(cpf);
  expect(isValid).toBeFalsy();
});