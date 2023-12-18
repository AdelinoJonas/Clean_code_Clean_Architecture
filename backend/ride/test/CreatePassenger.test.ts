import CreatePassenger from "../src/application/usecase/CreatePassenger";

test("Deve cadastrar um passageiro", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
  };
  const usecase = new CreatePassenger();
  const output = await usecase.execute(input);  
  expect(output).toBeDefined();
});