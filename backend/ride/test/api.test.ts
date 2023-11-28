
import axios from "axios";

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
    document: "83432616682"
  };
  const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassenger = responseCreatePassenger.data;  
  expect(outputCreatePassenger).toBeDefined();
});

test("Deve obter um passageiro", async function(){
  const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616683"
  };
  const response1 = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassenger = response1.data;
  console.log(response1);
  const response2 = await axios.get(`http://localhost:3000/passengers/${outputCreatePassenger}`);
  const output2 = response2.data.message;
  console.log("output2:",output2);
  expect(output2.name).toBe("John Does");
  expect(output2.email).toBe("jhon.does@gmail.com");
  expect(output2.document).toBe("83432616683");
});

