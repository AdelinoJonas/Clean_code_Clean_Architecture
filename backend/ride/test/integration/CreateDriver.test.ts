import sinon from "sinon";
import CreateDriver from "../../src/application/usecase/CreateDriver";
import GetDriver from "../../src/application/usecase/GetDriver";
import DriverRepository from "../../src/infra/repository/DriverRepositoryDataBase";
import DriverRepositoryDataBase from "../../src/infra/repository/DriverRepositoryDataBase";
import Driver from "../../src/domain/Driver";
test("Deve cadastrar o motorista", async function(){
  const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999"
  };
  const usecase = new CreateDriver(new DriverRepositoryDataBase());
  const output = await usecase.execute(input);
  expect(output.driver_id).toBeDefined();
});

test("Deve obter um motorista", async function(){
  const driverRepository: DriverRepository = {
    async save (driver: any): Promise<any>{
    },
    async get (driverId: string): Promise<any>{
      return Driver.create("John Does","jhon.does@gmail.com","83432616074","AAA9999")
    }
  };
    const input = {
    name: "John Does",
    email: "jhon.does@gmail.com",
    document: "83432616074",
    carPlate: "AAA9999"
  };
  const usecase = new CreateDriver(driverRepository);
  const output = await usecase.execute(input);
  const usecase1 = new GetDriver(driverRepository);
  const output1 = await usecase1.execute({driverId: output.driver_id}); 
  expect(output1.name).toBe("John Does");
  expect(output1.email).toBe("jhon.does@gmail.com");
  expect(output1.document).toBe("83432616074");
  expect(output1.car_plate).toBe("AAA9999");
});