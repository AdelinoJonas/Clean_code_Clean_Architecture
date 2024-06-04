import CreatePassenger from "../../src/application/usecase/CreatePassenger";
import GetPassenger from "../../src/application/usecase/GetPassenger";
import PassengerRepositoryDataBase from "../../src/infra/repository/PassengerRepositoryDataBase";

test("Deve cadastrar um passageiro", async function(){
  const input = {
    name: "Jhon Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
  };
  const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
  const output = await usecase.execute(input);  
  expect(output).toBeDefined();
});

test("Não deve cadastrar um passageiro com e-mail inválido", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail",
    document: "83432616074",
  };
  const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error("Invalid email"));  
});

test("Deve obter um passageiro", async function(){
  const input = {
    name: "Jhon Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074"
  };
  const usecase = new CreatePassenger(new PassengerRepositoryDataBase());
  const output = await usecase.execute(input); 
  const usecase1 = new GetPassenger(new PassengerRepositoryDataBase());
  const output1 = await usecase1.execute({passengerId: output.passenger_id});
  console.log("TEST",output1);
  expect(output1.name).toBe(input.name);
  expect(output1.email).toBe(input.email);
  expect(output1.document).toBe(input.document);
});