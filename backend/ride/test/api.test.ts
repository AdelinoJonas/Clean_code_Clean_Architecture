
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
    document: "83432616074"
  };
  const responseCreatePassenger = await axios.post("http://localhost:3000/passengers", input);
  const outputCreatePassenger = responseCreatePassenger.data;
  expect(outputCreatePassenger.passengerId).toBeDefined();
  const response2 = await axios.post(`http://localhost:3000/passengers/${outputCreatePassenger.passengerId}`);
  const output2 = response2.data;
  expect(output2.name).toBe("John Doe");
  expect(output2.email).toBe("jhon.doe@gmail.com");
  expect(output2.document).toBe("83432616074");
});

