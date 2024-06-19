import axios from "axios";

axios.defaults.validateStatus = function() {
  return true;
};

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function(){
  const input = {
    positions : [
      {lat: -27.584905257808835, long: -48.545022195325124, date: new Date("2021-03-01T10:00:00")},
      {lat: -27.496887588317275, long: -48.522234807851475, date: new Date("2021-03-01T10:00:00")}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  const output = response.data;
  expect(output.price).toBe(21);
});
test("Deve retornar erro se a data for inválida", async function(){
  const input = {
    positions : [
      {lat: -27.584905257808835, long: -48.545022195325124, date: "javascript"},
      {lat: -27.496887588317275, long: -48.522234807851475, date: "javascript"}
    ]
  };
  const response = await axios.post("http://localhost:3000/calculate_ride", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid date");
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
    carPlate: "AAA9999"
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
    car_plate: "AAA9999"
  };
  const response = await axios.post("http://localhost:3000/driver", input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe("Invalid cpf")
});
