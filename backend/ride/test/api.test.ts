import axios from "axios";

axios.defaults.validateStatus = function() {
  return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function(){
  const input = {
    segments: [
    {distance: 10, date: "2021-03-01T10:00:00"}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test("Deve cadastrar um passageiro", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
  };
  const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassenger = responseCreatePassenger.data;  
  expect(outputCreatePassenger).toBeDefined();
});

test("Não deve cadastrar um passageiro com cpf invalido", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616076",
  };
  const response = await axios.post("http://localhost:3000/passengers", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid cpf")
});

test("Deve cadastrar o motorista", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616074",
    carPlate: "AAA999"
  };
  const tryCreateDriver = await axios.post("http://localhost:3000/driver", input);
  const tryCreateDriverResponse = tryCreateDriver.data;
  expect(tryCreateDriverResponse).toBeDefined();
});

test("Não deve cadastrar um motorista com cpf invalido", async function(){
  const input = {
    name: "John Doe",
    email: "jhon.doe@gmail.com",
    document: "83432616076",
    car_plate: "AAA999"
  };
  const response = await axios.post("http://localhost:3000/driver", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid cpf")
});
