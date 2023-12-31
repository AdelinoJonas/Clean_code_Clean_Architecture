import CalculateRide from "../src/application/usecase/CalculateRide";
import UseCase from "../src/application/usecase/UseCase";

test("Deve fazer o cálculo do preço de uma corrida durante o dia", async function(){
  const input = {
    segments : [
      {distance: 10, date: new Date("2021-03-01T10:00:00")}
    ]
  }
  const usecase = new CalculateRide();
  const output = await usecase.execute(input);

  expect(output.price).toBe(21);
});