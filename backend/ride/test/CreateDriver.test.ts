import CreateDriver from "../src/application/usecase/CreateDriver";
test("Deve cadastrar o motorista", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
    car_plate: "AAA999"
  };
  const usecase = new CreateDriver();
  const output = await usecase.execute(input);
  expect(output).toBeDefined();
});