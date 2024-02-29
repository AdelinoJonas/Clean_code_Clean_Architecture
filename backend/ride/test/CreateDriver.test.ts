import CreateDriver from "../src/application/usecase/CreateDriver";
import GetDriver from "../src/application/usecase/GetDriver";
import sinon from "sinon";
import DriverRepository from "../src/infra/repository/DriverRepository";
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

test("Deve obter um motorista", async function(){
  const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    car_plate: "AAA999"
  };
  const stubSave = sinon.stub(DriverRepository.prototype, "save").resolves();
  const usecase = new CreateDriver();
  const output = await usecase.execute(input);
  stubSave.restore();
  const stubGet = sinon.stub(DriverRepository.prototype, "get").resolves({
    driverId: output.driver_id,
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    car_plate: "AAA999"
  });
  const usecase1 = new GetDriver();
  const output1 = await usecase1.execute({driverId: output.driver_id}); 
  stubGet.restore();
  expect(output1.name).toBe("John Does");
  expect(output1.email).toBe("jhon.does@gmail.com");
  expect(output1.document).toBe("83432616074");
  expect(output1.car_plate).toBe("AAA999");
});