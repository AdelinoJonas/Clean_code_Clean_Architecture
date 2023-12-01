
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

test("Deve obter um passageiro", async function(){
  const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074"
  };
  const response1 = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassenger = response1.data;
  const response2 = await axios.get(`http://localhost:3000/passengers/${outputCreatePassenger}`);
  const output2 = response2.data;
  expect(output2.name).toBe("John Does");
  expect(output2.email).toBe("jhon.does@gmail.com");
  expect(output2.document).toBe("83432616074");
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

test("Deve obter o motorista", async function(){
  const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    car_plate: "AAA999"
  };
  const response1 = await axios.post("http://localhost:3000/driver", input);
  const outputCreateDriver = response1.data;
  const response2 = await axios.get(`http://localhost:3000/driver/${outputCreateDriver}`);
  const output2 = response2.data;
  expect(output2.name).toBe("John Does");
  expect(output2.email).toBe("jhon.does@gmail.com");
  expect(output2.document).toBe("83432616074");
  expect(output2.car_plate).toBe("AAA999");
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
